#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkApigatewayMock } from '../lib/cdk-apigateway-mock';

const app = new cdk.App();
new CdkApigatewayMock(app, 'CdkApigatewayStack', {
  env: {
    region: 'us-east-1',
    account: '111122223333'
  }
});
