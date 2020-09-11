import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import {useState, useEffect} from 'react'
import {singleCategory} from '../../actions/category'
import {API, DOMAIN, APP_NAME} from '../../config'
import moment from 'moment'
import renderHTML from 'react-render-html'

const Category=({category})=>{
    return (
        <React.Fragment>
            <Layout>
                <main>
                    <div className="container-fluid text-center">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 font-weight-bold">
                                    {category.name}
                                </h1>
                            </div>
                        </header>
                    </div>
                </main>
            </Layout>
        </React.Fragment>
    )
}

Category.getInitialProps=({query})=>{
    return singleCategory(query.slug).then(data=>{
        if(data.error){
            console.log(data.error)
        }else{
            return {category: data}
        }
    })
}

export default Category