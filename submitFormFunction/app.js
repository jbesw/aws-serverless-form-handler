/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: MIT-0
 */

'use strict'

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 */

const { saveFormData } = require('./dynamodb')
const { sendEmail } = require('./ses')

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST"
}

// Main Lambda entry point
exports.handler = async (event) => {

    console.log(`Started with: ${event.body}`)
    const formData = JSON.parse(event.body)

    try {
      // Send email and save to DynamoDB in parallel using Promise.all
      await Promise.all([sendEmail(formData), saveFormData(formData)])

      return {
          statusCode: 200,
          body: 'OK!',
          headers
      }
    } catch(err) {
      console.error('handler error: ', err)

      return {
          statusCode: 500,
          body: 'Error',
          headers
      }
    }
}
