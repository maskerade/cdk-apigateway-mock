# API Gateway Mock using CDK (TypeScript)

This project creates an API Gateway with a MOCK implementation to return data.

The integration response object uses VTL to dynamically manipulate the response data based on the input data.

This implementation just performs a simple currency conversion.

Once deployed you can call the API endpoint using Curl as follows:

```shell script
                    
curl -X POST https://<api-gateway-endpoint>/prod/ -H "Content-Type: application/json" -d '{"inputCurrency": "GBP", "outputCurrency": "USD", "inputAmount": 80}'

```

NOTE: By Default it only supports an `inputCurrency` of GBP and an `outputCurrency` of USD or EUR.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful - CDK commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
