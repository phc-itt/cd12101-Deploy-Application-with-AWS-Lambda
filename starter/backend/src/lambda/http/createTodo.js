import createTodoService from '../../businessLogic/createTodoService.mjs'
import createLogger from '../../utils/logger.mjs'
import { defaultResponseHeader } from '../../utils/utils.mjs'

const logger = createLogger('createTodo')
export const handler = async (event) => {
  let httpResponse = {}
  try {
    const { Items } = await createTodoService(event)
    httpResponse = {
      ...defaultResponseHeader,
      statusCode: 200,
      body: JSON.stringify({
        item: Items[0]
      })
    }
  } catch (err) {
    logger.error('Create Todo failed with error: ', err)
    httpResponse = {
      ...defaultResponseHeader,
      statusCode: 500,
      body: JSON.stringify({
        item: {}
      }),
      status: 'error',
      message: err.message
    }
  }
  return httpResponse
}
