const { readFileSync } = require('fs')
const { resolve } = require('path')
const axios = require('axios').default
const { formatDate } = require('../util/utils')
const HttpCodes = require('../httpCodes')
const MessageCodes = require('../../shared/messageCodes')
const mailer = require('../util/catalogCardEmail')

async function send(ctx) {
  const { body } = ctx.request

  try {
    await mailer('contact', {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RCV_ADDRESS,
      subject: `Chamado FICAT ${body.name} - ${formatDate()}`,
      html: makeEmailContent(body)
    })

    ctx.response.status = 200
    return ctx.response
  } catch (error) {
    ctx.throw(HttpCodes.INT_SRV_ERROR, {
      code: MessageCodes.error.errOnEmailSend,
      message: error.message
    })
  }
}

function makeEmailContent({ name, email, fone, msg }) {
  const emailContent = readFileSync(
    resolve(__dirname, '../models/email/email.html'),
    'utf8'
  )
  return emailContent
    .replace('{{name}}', name)
    .replace('{{email}}', email)
    .replace('{{fone}}', fone)
    .replace('{{msg}}', msg)
}

async function captchaValidate(ctx) {
  const { token } = ctx.query
  try {
    const { data } = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        secret: process.env.RECAPTCHA_SECRET_KEY,
        token
      }
    )
    ctx.status = HttpCodes.OK
    ctx.body = data
  } catch (e) {
    ctx.throw(HttpCodes.FAILED_DEPENDENCY, {
      code: MessageCodes.error.errCaptchaSrvNoResponse,
      message: e.message
    })
  }
}

module.exports = { send, captchaValidate }
