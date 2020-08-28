import { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'serverless-tutorial',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '>=1.72.0',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    profile: 'bms_serverless',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'translate:*',
        ],
        Resource: '*'
      }
    ],
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    
  },
  functions: {
    hello: {
      handler: 'handler.hello',
      events: [
        {
          http: {
            method: 'get',
            path: 'hello',
          }
        }
      ]
    },
    getCityInfo: {
      handler: 'lambdas/getCityInfo.handler',
      events: [
        {
          http: {
            method: 'GET',
            path: 'get-city/{city}',
            cors: true,
          }
        }
      ]
    },
    translate: {
      handler: 'lambdas/translate.handler',
      events: [
        {
          http: {
            method: 'POST',
            path: 'translate',
            cors: true,
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
