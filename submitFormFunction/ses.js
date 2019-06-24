/*
  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
  Permission is hereby granted, free of charge, to any person obtaining a copy of this
  software and associated documentation files (the "Software"), to deal in the Software
  without restriction, including without limitation the rights to use, copy, modify,
  merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
  PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

'use strict'

const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION || 'us-east-1' })
const SES = new AWS.SES()

const sendEmail = async function (formData) {

  const getContent = (formData) => {
    let retval = ''
    for (var attribName in formData){
      retval += attribName + ': ' + formData[attribName] + '\n\n'
    }
    return retval
  }
  
  return new Promise(async (resolve, reject) => {

    // Build params for SES
    const emailParams = {
      Source: process.env.ValidatedEmail, // SES SENDING EMAIL
      ReplyToAddresses: [process.env.ValidatedEmail],
      Destination: {
        ToAddresses: [process.env.ValidatedEmail], // SES RECEIVING EMAIL
      },
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: getContent(formData)
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'New Form Submission'
        },
      },
    }
    // Send the email
    try {
      const result = await SES.sendEmail(emailParams).promise()
      console.log('sendEmail result: ', result)
      resolve()
    } catch (err) {
      console.error('sendEmail error: ', err)
      reject()
    }
  })
}

module.exports = { sendEmail }