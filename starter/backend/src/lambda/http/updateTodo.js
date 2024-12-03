import updateTodoService from '../../businessLogic/updateTodoService.mjs'
import { defaultResponseHeader } from '../../utils/utils.mjs'
import createLogger from '../../utils/logger.mjs'

const logger = createLogger('updateTodo')
export const handler = async (event) => {
  let httpResponse = {}
  try {
    const { Items, Attributes } = await updateTodoService(event)
    httpResponse = {
      ...defaultResponseHeader,
      statusCode: 200,
      body: JSON.stringify({
        item: Items || Attributes // Return the updated attributes
      })
    }
  } catch (error) {
    logger.error('Update Todo failed with error: ', error)
    httpResponse = {
      ...defaultResponseHeader,
      statusCode: 500,
      status: 'error',
      body: JSON.stringify({
        item: {}
      }),
      message: err.message
    }
  }
  return httpResponse
}
