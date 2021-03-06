import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as CdkApigatewayMock from '../lib/cdk-apigateway-mock';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new CdkApigatewayMock.CdkApigatewayMock(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
