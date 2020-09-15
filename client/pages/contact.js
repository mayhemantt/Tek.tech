import Layout from '../components/Layout'
import ContactForm from '../components/form/ContactForm'
import Head from 'next/head'
import { useState } from 'react'

const Contact=()=>{

    

    const head=()=>(
        <Head>
            <title>
                Blog | Blog
            </title>
        </Head>
    )


    return(
        <Layout>
            {head()}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <h1 className="text-center"> Contact Form</h1>
                        <hr />
                        <ContactForm />
                    </div>
                </div>
            </div>
            
        </Layout>
    )
}

export default Contact