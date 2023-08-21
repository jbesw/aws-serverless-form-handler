/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: MIT-0
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
