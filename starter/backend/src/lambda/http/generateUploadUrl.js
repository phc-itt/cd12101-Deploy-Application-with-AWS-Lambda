import generateImageUploadUrl from '../../businessLogic/generateUploadUrlService.mjs'
import { defaultResponseHeader } from '../../utils/utils.mjs'
import createLogger from '../../utils/logger.mjs'

const logger = createLogger('generateImageURL')
export const handler = async (event) => {
  let httpResponse = {}
  try {
    const url = await generateImageUploadUrl(event)
    logger.info('Generate image upload URL succeeded', url)

    httpResponse = {
      ...defaultResponseHeader,
      statusCode: 200,
      body: JSON.stringify({ uploadUrl: url })
    }
  } catch (error) {
    logger.error('Generate image upload URL failed with error: ', error)
    httpResponse = {
      ...defaultResponseHeader,
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    }
  }

  return httpResponse
}
