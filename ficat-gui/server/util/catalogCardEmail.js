const fs = require('fs')
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2

// emailAddress, pdfName, stream
const mailer = async function(type, options) {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  )

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  })

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        console.log('test')
        reject(new Error(err))
      }
      resolve(token)
    })
  })

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_USER,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN
    }
  })

  transporter.sendMail(options, err => {
    if (err) {
      console.log(err)
    }
    console.log('before unlink')

    if (type === 'indexCardCopy') {
      fs.unlink('./assets/pdf_location/ficha.pdf', err => {
        if (err) {
          console.error(err)
        } else {
          console.log('cleared')
        }
      })
    }
  })
}

module.exports = mailer
