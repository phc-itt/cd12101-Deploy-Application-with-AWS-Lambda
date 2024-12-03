import getTodoService from '../../businessLogic/getTodoService.mjs'
import { defaultResponseHeader } from '../../utils/utils.mjs'
import createLogger from '../../utils/logger.mjs'

const logger = createLogger('getTodo')
export const handler = async (event) => {
  let httpResponse = {}
  try {
    const result = await getTodoService(event)
    logger.info('get todo result', result)

    httpResponse = {
      ...defaultResponseHeader,
      statusCode: 200,
      body: JSON.stringify({ items: result.Items || [] })
    }
  } catch (err) {
    logger.info('Get all Todos Failed', err)

    httpResponse = {
      ...defaultResponseHeader,
      statusCode: 500,
      body: JSON.stringify({ items: [] })
    }
  }

  return httpResponse
}
