import getConfig from 'next/config'

const {publicRuntimeConfig}=getConfig()



export const API= publicRuntimeConfig.PRODUCTION ? 'https://blog.com' :'http://localhost:8000/api'

export const APP_NAME= publicRuntimeConfig.APP_NAME? publicRuntimeConfig.APP_NAME : 'BLOG'

export const DOMAIN = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.DOMAIN_DEVELOPMENT : publicRuntimeConfig.DOMAIN_PRODUCTION

export const DISQUS_SHORTNAME= publicRuntimeConfig.DISQUS_SHORTNAME? publicRuntimeConfig.DISQUS_SHORTNAME : "blog-seo"

export const GOOGLE_CLIENT_ID= publicRuntimeConfig.GOOGLE_CLIENT_ID ?publicRuntimeConfig.GOOGLE_CLIENT_ID:"298163098973-qouol8b97jlbuqqtr7rcu6vuqg5ng0fu.apps.googleusercontent.com"