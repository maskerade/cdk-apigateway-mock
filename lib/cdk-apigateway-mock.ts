import * as cdk from '@aws-cdk/core';
import * as apigateway from '@aws-cdk/aws-apigateway';


export class CdkApigatewayMock extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const mockAPI = new apigateway.RestApi(this, "mockAPI", {
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS
      }
    });

    mockAPI.root.addMethod(
      "POST",
      new apigateway.MockIntegration({
        passthroughBehavior: apigateway.PassthroughBehavior.NEVER,
        requestTemplates: {
          // For this particular request (in our case every request that is made to this endpoint)
          // respond with integration response defined for statusCode 201.
          // overwrite request body as we are using a mock (https://stackoverflow.com/questions/47918477/aws-api-gateway-use-mock-integration-to-echo-response-body)
          "application/json": `
          #set($context.requestOverride.path.body = $input.body)
          {
                "statusCode": 201
          }`
        },
        integrationResponses: [
          {
            statusCode: "201",
            responseTemplates: {
              "application/json": `
              #set($body = $context.requestOverride.path.body)
              #set ($currencyMap = {})
              #set ($currencyMap.Map={'GBPUSD':1.378615,'GBPEUR':1.163627})
              #set($inputCurrency = $util.parseJson($body).inputCurrency)
              #set($outputCurrency = $util.parseJson($body).outputCurrency)
              #set($inputAmount = $util.parseJson($body).inputAmount)
              #set($currencyCode = "$inputCurrency$outputCurrency")
              #set($currencyRate = $currencyMap.Map.get($currencyCode))
              #set($outputAmount = $currencyRate * $inputAmount  )
              $outputCost
              {
                    "id": "$context.requestId",
                    "createdAt": $context.requestTimeEpoch,
                    "updatedAt": $context.requestTimeEpoch,
                    "currencyCode" $currencyCode,
                    "currencyRate": $currencyRate,
                    "inputCurrency": $inputCurrency,
                    "outputCurrency": $outputCurrency,
                    "inputAmount": $inputAmount,
                    "outputAmount": $outputAmount,
                    "body": $body
              }`
            },
            // These definitions would not be possible without the definition within the `responseParameters` section.
            responseParameters: {
              "method.response.header.Access-Control-Allow-Methods":
                "'OPTIONS,GET,PUT,POST,DELETE,PATCH,HEAD'",
              "method.response.header.Access-Control-Allow-Headers":
                "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
              "method.response.header.Access-Control-Allow-Origin": "'*'"
            }
          }
        ]
      }),
      {
        methodResponses: [
          {
            // Everything defined in this section is applicable to the integration response with `statusCode` of 201.
            statusCode: "201",
            responseParameters: {
              // What kind of response parameters are allowed to be defined within the `responseParameters` section.
              "method.response.header.Access-Control-Allow-Origin": true,
              "method.response.header.Access-Control-Allow-Methods": true,
              "method.response.header.Access-Control-Allow-Headers": true
            }
          }
        ]
      }
    );
  }
}
