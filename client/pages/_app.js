import React from 'react'
import '../node_modules/react-quill/dist/quill.snow.css'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }) {
    return(
    <>
    <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  
    </Head>
     <Component {...pageProps} />
     </>
    )
  }