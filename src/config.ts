export const S3_BUCKET =
  process.env.NODE_ENV === 'development'
    ? 'https://recipe-bible-content.s3-eu-west-1.amazonaws.com' // todo 'http://localhost:5001'
    : 'https://recipe-bible-content.s3-eu-west-1.amazonaws.com'

export const mediumScreen = 700
export const smallScreen = 500

export const API_URI =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/v2'
    : 'http://todo-somewhere-on-aws/api/v2'

export const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://recipebible.net'
