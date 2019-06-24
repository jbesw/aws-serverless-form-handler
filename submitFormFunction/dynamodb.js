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
const documentClient = new AWS.DynamoDB.DocumentClient()

// DynamoDB functions.

const saveFormData = async (formData) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: process.env.FormDataTable,
      Item: {
        formId: Math.floor(Math.random() * Math.floor(10000000)).toString(),
        formData: JSON.stringify(formData),   //stringify to store against empty responses in form
        created: Math.floor(Date.now() / 1000)
      }
    }
    console.log(params)
    documentClient.put(params, function(err, data) {
      if (err) {
          console.error(err)
          reject(err)
      }
      else resolve(data)
    })
  })
}

module.exports = { saveFormData }
