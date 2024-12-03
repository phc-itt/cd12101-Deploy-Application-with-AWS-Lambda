import AWS from 'aws-sdk'
import AWSXRay from 'aws-xray-sdk-core'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import {
  DeleteCommand,
  PutCommand,
  QueryCommand,
  UpdateCommand
} from '@aws-sdk/lib-dynamodb'
import { environments } from '../utils/utils.mjs'
import createLogger from '../utils/logger.mjs'

const logger = createLogger('DBAccessLayer')

const dynamoDb = new AWS.DynamoDB.DocumentClient()
const dynamoDbClient = AWSXRay.captureAWSv3Client(
  new DynamoDBClient({
    region: environments.region
  })
)
const documentClient = DynamoDBDocumentClient.from(dynamoDbClient)

export const createRecord = async (params = {}) => {
  logger.info('createRecord with params: ', params)
  const result = await documentClient.send(new PutCommand(params))

  return result
}

export const getRecord = async (params = {}) => {
  logger.info('getRecord with params: ', params)
  const result = await documentClient.send(new QueryCommand(params))

  return result
}

export const deleteRecord = async (params = {}) => {
  logger.info('deleteRecord with params: ', params)
  const result = await documentClient.send(new DeleteCommand(params))

  return result
}

export const updateRecord = async (params = {}) => {
  logger.info('updateRecord with params: ', params)
  const result = await documentClient.send(new UpdateCommand(params))

  return result
}

export const saveImageUrl = async (params = {}) => {
  logger.info('saveImageUrl with params: ', params)
  const result = await dynamoDb.update(params).promise()

  return result
}
