import axios from 'axios'
import pkg from 'jsonwebtoken'
import createLogger from '../../utils/logger.mjs'
import { environments } from '../../utils/utils.mjs'

const { verify } = pkg
const jwksUrl = `https://${environments.auth0Domain}/.well-known/jwks.json`
const logger = createLogger('auth')

async function verifyToken(authHeader) {
  const token = getToken(authHeader)
  logger.info('verifyToken getToken', token)

  const response = await axios.get(jwksUrl)
  const signKeys = response['data']['keys'][0]['x5c'][0]

  if (!signKeys.length) {
    throw new Error('error')
  }
  const certificate = `-----BEGIN CERTIFICATE-----\n${signKeys}\n-----END CERTIFICATE-----`
  logger.info('certificate', certificate)

  return verify(token, certificate, { algorithms: ['RS256'] })
}

function getToken(authHeader) {
  logger.info('getToken authHeader', authHeader)
  if (!authHeader) {
    throw new Error('No authentication header')
  }

  if (!authHeader.toLowerCase().startsWith('bearer ')) {
    throw new Error('Invalid authentication header')
  }

  const split = authHeader.split(' ')
  const token = split[1]
  logger.info('const token = split[1]', token)

  return token
}

export async function handler(event) {
  try {
    const jwtToken = await verifyToken(event.authorizationToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}
