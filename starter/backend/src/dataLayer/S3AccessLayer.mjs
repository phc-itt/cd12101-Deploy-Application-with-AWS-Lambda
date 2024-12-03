import AWSXRay from 'aws-xray-sdk-core'
import { S3Client } from '@aws-sdk/client-s3'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { environments } from '../utils/utils.mjs'
import createLogger from '../utils/logger.mjs'

const logger = createLogger('S3AccessLayer')

const s3Client = AWSXRay.captureAWSv3Client(
  new S3Client({
    region: environments.region,
    signatureVersion: 'v4'
  })
)

export const getS3SignUrl = async (keyName, expiresIn = 3600) => {
  const command = new PutObjectCommand({
    Bucket: environments.bucket,
    Key: keyName,
    ContentType: 'image/png'
  })

  logger.info('PutObjectCommand command', command)
  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn })
  logger.info('signedUrl', signedUrl)

  return signedUrl
}
