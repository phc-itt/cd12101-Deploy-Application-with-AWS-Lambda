import { deleteRecord } from '../dataLayer/todoDynamodbAccessLayer.mjs'
import { getUserId } from '../lambda/utils.mjs'
import { environments } from '../utils/utils.mjs'
import createLogger from '../utils/logger.mjs'

const logger = createLogger('deleteTodoService')

const deleteTodoService = async (event) => {
  logger.info('Delete Todo event:', event)
  const { todoId } = event.pathParameters
  const userId = getUserId(event)
  await deleteRecord({
    TableName: environments.todosTableName,
    Key: {
      todoId,
      userId
    }
  })

  logger.info('Delete Todo succeeded')
}

export default deleteTodoService
