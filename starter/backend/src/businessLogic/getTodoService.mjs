import { getUserId } from '../lambda/utils.mjs'
import { getRecord } from '../dataLayer/DBAccessLayer.mjs'
import { environments } from '../utils/utils.mjs'
import createLogger from '../utils/logger.mjs'

const logger = createLogger('getAllTodosService')
const getAllTodosService = async (event) => {
  logger.info('getAllTodosService event', event)

  let userId = getUserId(event)
  logger.info('userId', userId)

  const result = await getRecord({
    TableName: environments.todosTableName,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId
    }
  })

  logger.info('Get all Todos Succeeded')
  return result
}

export default getAllTodosService
