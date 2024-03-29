export const LOCALHOST = 'http://localhost'
export const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN
export const AUTH0_CLIENTID = process.env.AUTH0_CLIENTID
export const AUTH0_CALLBACK = process.env.AUTH0_CALLBACK
export const BASE_URL = process.env.BASE_URL || LOCALHOST
export const API_BASE_URL = process.env.API_BASE_URL || LOCALHOST
export const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET || `${LOCALHOST}:4566/recipe-bible-content`
export const GA_TAG = process.env.GA_TAG
export const IS_OFFLINE = BASE_URL.includes('localhost')
export const ADMIN_ROLE = 'admin'
