const User = require('../models/User')
const HttpCodes = require('../httpCodes')
const MessageCodes = require('../../shared/messageCodes')

async function create(ctx) {
  const payload = ctx.request.body
  const username = payload.username
  const existingUser = await User.where({ username }).fetch()
  if (existingUser) {
    ctx.throw(
      HttpCodes.BAD_REQUEST,
      MessageCodes.error.errEntityAlreadyExist('user')
    )
    return
  }
  ctx.status = HttpCodes.OK
  const newUser = await User.forge(payload).save()
  ctx.set('Location', `/api/users/${username}`)
  ctx.body = newUser
}

async function list(ctx) {
  try {
    ctx.body = await User.fetchAll()
  } catch (e) {
    ctx.throw(HttpCodes.BAD_REQUEST, MessageCodes.error.errOnDbFetch, {
      error: {
        rawErrorMessage: e.stack
      }
    })
  }
}

async function findById(ctx) {
  const id = ctx.params.id

  try {
    ctx.body = await User.where({ id }).fetch()
  } catch (e) {
    ctx.throw(HttpCodes.BAD_REQUEST, MessageCodes.error.errOnDbFetch, {
      error: {
        rawErrorMessage: e.stack
      }
    })
  }
}

async function update(ctx) {
  // const username = ctx.params.username
  const id = ctx.params.id
  const payload = ctx.request.body
  let user = await User.where({ id }).fetch()
  if (user) {
    console.log('user exists')
    try {
      user = await User.where({ id }).save(payload, {
        patch: true
      })
      ctx.status = HttpCodes.OK
      ctx.body = user
    } catch (e) {
      ctx.throw(HttpCodes.INT_SRV_ERROR, MessageCodes.error.errOnDbSave, {
        error: {
          rawErrorMessage: e.stack
        }
      })
    }
  } else {
    ctx.throw(
      HttpCodes.BAD_REQUEST,
      MessageCodes.error.errEntityDoesNotExist('user')
    )
  }
}

module.exports = { create, list, findById, update }
