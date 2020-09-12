import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import {useState, useEffect} from 'react'
import {singleTag} from '../../actions/tags'
import {API, DOMAIN, APP_NAME} from '../../config'
import moment from 'moment'
import renderHTML from 'react-render-html'
import  Card from '../../components/blog/Card'

const Tag=({tag, blogs, query})=>{

    const head=()=>{
        return <Head>
            <title> {tag.name} | {APP_NAME} </title>
            <meta name="description" content={`Best Programming Tutorial On ${tag.name}`}/>
            <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`}/>
            <meta property="og:title" content={`${tag.name}| ${APP_NAME}`}/>
            <meta property="og:description" content={`Best Programming Tutorial On ${tag.name}`}/>

            <meta property="og:type" content="website"/>
            <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>

            <meta property="og:image" content={`${DOMAIN}/static/images/blog1.png`}/>
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/blog1.png`}/>
            <meta property="og:image:type" content="image/png"/>
            <meta property="fb:app_id" content={`${APP_NAME}`}/>
        </Head>
    }

    return (
        <React.Fragment>
            {head()}
            <Layout>
                <main>
                    <div className="container-fluid text-center">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 font-weight-bold">
                                    {tag.name}
                                </h1>
                                {blogs.map((b,i)=>
                                <div>

                                <Card key={i} blog={b}/>
                                <hr />
                                </div>
                                )}
                            </div>
                        </header>
                    </div>
                </main>
            </Layout>
        </React.Fragment>
    )
}

Tag.getInitialProps=({query})=>{
    return singleTag(query.slug).then(data=>{
        if(data.error){
            console.log(data.error)
        }else{
            return {tag: data.tag, blogs: data.blogs, query}
        }
    })
}

export default Tag