# Serverless Form Handler

The Serverless Form Handler accepts a form submission from a webpage, saving the data to a DynamoDB table and sending an email via SES.

Important: this application uses various AWS services and there are costs associated with these services after the Free Tier usage - please see the [AWS  pricing page](https://aws.amazon.com/pricing/) for details.

```bash
.
├── README.MD                   <-- This instructions file
├── submitFormFunction          <-- Source code for the main lambda function
│   └── app.js                  <-- Main Lambda handler
│   └── dynamodb.js             <-- DynamoDB helper function
│   └── ses.js                  <-- Wrapper for Amazon SES
│   └── testHarness.js          <-- For testing code locally
│   └── package.json            <-- NodeJS dependencies and scripts
├── template.yaml               <-- SAM template
```

## Requirements

* AWS CLI already configured with Administrator permission
* [NodeJS 12.x installed](https://nodejs.org/en/download/)

## Installation Instructions

1. [Create an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) if you do not already have one and login.
1. Go to the app's page on the [Serverless Application Repository](https://serverlessrepo.aws.amazon.com/applications/) and click "Deploy"
1. Provide the required app parameters (see parameter details below) and click "Deploy"

## Parameter Details

* Validated email: provided an email address that has been validated in the Amazon SES service in the same region when you are deploying this application. For instructions on how to validate an email in SES, see [this page](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-email-addresses-procedure.html).

## Using this Application

* This application creates an API Gateway endpoint where browser-based forms can send text-based form data. The application will store the response in a DynamoDB table and email the form data to the Validated Email.
* This application is for educational purposes and does not provide any throttling on the API Gateway endpoint. For production usage, you should [apply throttling to your API resources](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html).

## How it works

* Deploy this serverless application and take a note of the API endpoint.
* Create a form in a webpage and use the Javascript handling functon as shown in [this Gist](https://gist.github.com/jbesw/b75a2409521e2ff632dce7c8e07d6d2a) for an example. Use the API endpoint in the AJAX request to process the form data.

==============================================

Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.

SPDX-License-Identifier: MIT-0