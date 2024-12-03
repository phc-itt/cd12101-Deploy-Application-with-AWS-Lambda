import { updateRecord } from '../dataLayer/DBAccessLayer.mjs'
import { getUserId } from '../lambda/utils.mjs'
import { environments } from '../utils/utils.mjs'
import createLogger from '../utils/logger.mjs'

const logger = createLogger('updateTodoService')

const updateTodoService = async (event) => {
  logger.info('getAllTodosService event', event)

  const todoId = event.pathParameters.todoId
  const updatedTodo = JSON.parse(event.body)

  let userId = getUserId(event)
  const { name, dueDate, done } = updatedTodo

  const result = await updateRecord({
    TableName: environments.todosTableName,
    Key: {
      todoId,
      userId
    },
    UpdateExpression:
      'SET #dueDate = :newDueDate, #name = :newName, #done = :newDone',
    ExpressionAttributeNames: {
      '#dueDate': 'dueDate',
      '#name': 'name',
      '#done': 'done'
    },
    ExpressionAttributeValues: {
      ':newDueDate': dueDate,
      ':newName': name,
      ':newDone': done
    },
    ReturnValues: 'ALL_NEW'
  })

  logger.info('Update Todo Succeeded with result:', result)
  return result
}

export default updateTodoService
