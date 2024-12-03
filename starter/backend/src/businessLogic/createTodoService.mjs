import { v4 as uuidv4 } from 'uuid'
import { createRecord, getRecord } from '../dataLayer/DBAccessLayer.mjs'
import { getUserId } from '../lambda/utils.mjs'
import { environments } from '../utils/utils.mjs'
import createLogger from '../utils/logger.mjs'

const logger = createLogger('createTodoService')

const createTodoService = async (event) => {
  logger.info('Create Todo event: ', event)
  const newTodo = JSON.parse(event.body)

  newTodo.userId = getUserId(event)
  newTodo.todoId = uuidv4()

  logger.info('Create todo with data:', newTodo)

  await createRecord({
    TableName: environments.todosTableName,
    Item: newTodo,
    ReturnValues: 'ALL_OLD'
  })

  const result = await getRecord({
    TableName: environments.todosTableName,
    KeyConditionExpression: 'userId = :userId AND todoId = :todoId',
    ExpressionAttributeValues: {
      ':userId': newTodo.userId,
      ':todoId': newTodo.todoId
    },
    Limit: 1,
    ScanIndexForward: false
  })
  logger.info('Create Todo Success result', result)

  return result
}

export default createTodoService
