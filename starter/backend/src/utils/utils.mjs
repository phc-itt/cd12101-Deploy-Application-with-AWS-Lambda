export const environments = {
  todosTableName: process.env.TODOS_TABLE,
  imagesTableName: process.env.IMAGES_TABLE,
  bucket: process.env.IMAGES_S3_BUCKET,
  userIndex: process.env.TODOS_CREATED_AT_INDEX,
  signedUrlExpiration: parseInt(process.env.SIGNED_URL_EXPIRATION),
  region: process.env.REGION,
  auth0Domain: process.env.AUTH0_DOMAIN
}

export const defaultResponseHeader = {
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT, DELETE'
  }
}

export default { environments, defaultResponseHeader }
