/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: MIT-0
 */

const { handler } = require('./app')

// Mock event
const event = {
  "body": "{\"name\": \"Sender Name\",\"reply_to\": \"sender@email.com\",\"message\": \"A test message\"}"
}

const main = async () => {
  await handler(event)
}

main()
