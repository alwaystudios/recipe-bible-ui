export const ASSETS_URL =
  process.env.NODE_ENV === 'development' ? './' : 'http://todo-somewhere-on-aws-s3'

export const mediumScreen = 700
export const smallScreen = 500

export const API_URI =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/v2'
    : 'http://todo-somewhere-on-aws/api/v2'
