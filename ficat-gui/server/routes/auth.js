const User = require('../models/User')
const MessageCodes = require('../../shared/messageCodes')
const HttpCodes = require('../httpCodes')
const { tokenSign, tokenVerify } = require('../util/utils')

// Autenticação - Receber token
async function auth(ctx) {
  const { username, password, rememberMe } = ctx.request.body
  let user
  try {
    user = await User.where({ username }).fetch()
  } catch (e) {
    ctx.throw(HttpCodes.BAD_REQUEST, MessageCodes.error.errOnDbFetch, {
      error: {
        rawErrorMessage: e.stack
      }
    })
  }

  if (user) {
    try {
      await user.authenticate(password)
      const { accessToken, xsrfToken } = await tokenSign(user, rememberMe)
      ctx.status = HttpCodes.OK
      ctx.cookies.set(
        'accessToken',
        accessToken,
        {
          domain: process.env.HOST,
          secure: false,
          httpOnly: true
        },
        { withCredentials: true }
      )
      ctx.cookies.set(
        'xsrfToken',
        xsrfToken,
        {
          domain: process.env.HOST,
          secure: false,
          httpOnly: false
        },
        { withCredentials: true }
      )
    } catch (e) {
      ctx.throw(HttpCodes.BAD_REQUEST, MessageCodes.error.errPasswordMismatch)
    }
  } else {
    ctx.throw(
      HttpCodes.BAD_REQUEST,
      MessageCodes.error.errEntityDoesNotExist('users')
    )
  }
}

function getCookie(name, cookies) {
  const value = `; ${cookies}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2)
    return parts
      .pop()
      .split(';')
      .shift()
}

// Autorização - Obter acesso a recursos da API
function authz(ctx, next) {
  const token = ctx.cookies.get('accessToken', { withCredentials: true })

  const xsrfToken = getCookie('xsrfToken', ctx.headers.cookie)

  if (!token || !xsrfToken) {
    ctx.throw(HttpCodes.BAD_REQUEST, MessageCodes.error.errNotAuthorized)
    console.log('Erro de Autorização')
  }
  try {
    tokenVerify(token, xsrfToken)
    return next()
  } catch (e) {
    ctx.throw(HttpCodes.BAD_REQUEST, MessageCodes.error.errOnAuthz)
  }
}

module.exports = { auth, authz }
