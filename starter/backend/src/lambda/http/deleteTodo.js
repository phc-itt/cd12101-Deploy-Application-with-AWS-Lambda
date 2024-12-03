import deleteTodoService from '../../businessLogic/deleteTodoService.mjs'
import { defaultResponseHeader } from '../../utils/utils.mjs'
import createLogger from '../../utils/logger.mjs'

const logger = createLogger('deleteTodo')

export const handler = async (event) => {
  let httpResponse = {}
  try {
    await deleteTodoService(event)
    httpResponse = {
      ...defaultResponseHeader,
      statusCode: 200,
      body: JSON.stringify({
        isDeleted: true
      })
    }
  } catch (error) {
    logger.error('Cannot delete todo with error:', error)
    httpResponse = {
      ...defaultResponseHeader,
      statusCode: 500,
      status: 'error',
      body: JSON.stringify({
        isDeleted: false,
        message: e.message
      })
    }
  }
  return httpResponse
}
