import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import {useState} from 'react'
import {listBlogsWithCategoriesAndTags} from '../../actions/blog'
import {API} from '../../config'

const Blogs=()=>{
    return (
            <Layout>
                <main>
                    <div className="container-fluid">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 font-weight-bold text-center">
                                    Tech Blogs and Tutorials
                                </h1>
                            </div>
                            <section>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, velit.</p>
                            </section>
                        </header>
                    </div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                Show All Blogs
                            </div>
                        </div>
                    </div>
                </main>
            </Layout>
    )
}

Blogs.getInitialProps=()=>{
    return listBlogsWithCategoriesAndTags().then(data=>{
        if(data.error){
            console.log(data.error)
        }else{
            return {
                blogs: data.blogs,
                categories: data.categories, 
                tags: data.tags, 
                size : data.size
            }
        }
    })
}

export default Blogs