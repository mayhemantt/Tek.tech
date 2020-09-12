import getConfig from 'next/config'

const {publicRuntimeConfig}=getConfig()

export const API= publicRuntimeConfig.PRODUCTION ? 'https://blog.com' :'http://localhost:8000/api'

export const APP_NAME= publicRuntimeConfig.APP_NAME? publicRuntimeConfig.APP_NAME : 'BLOG'

export const DOMAIN = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.DOMAIN_DEVELOPMENT : publicRuntimeConfig.DOMAIN_PRODUCTION