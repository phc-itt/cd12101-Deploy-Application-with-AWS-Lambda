import { saveImageUrl } from '../dataLayer/DBAccessLayer.mjs'
import { getS3SignUrl } from '../dataLayer/S3AccessLayer.mjs'
import { getUserId } from '../lambda/utils.mjs'
import { environments } from '../utils/utils.mjs'
import createLogger from '../utils/logger.mjs'

const logger = createLogger('generateImageUploadUrl')
const generateImageUploadUrl = async (event) => {
  logger.info('generateImageUploadUrl event: ', event)
  const userId = getUserId(event)
  const todoId = event.pathParameters.todoId

  const imageUrl = await getS3SignUrl(
    `${userId}${todoId}`,
    environments.signedUrlExpiration
  )

  logger.info('imageUrl: ', imageUrl)

  // Update DynamoDB item
  const todo = await saveImageUrl({
    TableName: environments.todosTableName,
    Key: {
      todoId,
      userId
    },
    UpdateExpression:
      'SET attachmentUrl = :attachmentUrl, createAt = :createAt',
    ExpressionAttributeValues: {
      ':attachmentUrl': imageUrl.split('?')[0],
      ':createAt': new Date().toISOString()
    },
    ReturnValues: 'UPDATED_NEW'
  })

  logger.info('dynamoDb.update todo', todo)

  return imageUrl // Returning the signed URL
}

export default generateImageUploadUrl
