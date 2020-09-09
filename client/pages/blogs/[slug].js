import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import {useState, useEffect} from 'react'
import {singleBlog, listRelated} from '../../actions/blog'
import {API, DOMAIN, APP_NAME} from '../../config'
import moment from 'moment'
import renderHTML from 'react-render-html'
import SmallCard from '../../components/blog/SmallCard'

const SingleBlog=({blog, query})=>{


    const [related , setRelated]= useState([])
    const loadRelated=()=>{
            listRelated({blog}).then(data=>{
                if(data.error){
                    console.log(data.error)
                }else{
                setRelated(data)
            }
            })
        }

    useEffect(() => {
        loadRelated()
    }, [query.slug])


    const head=()=>{
        return <Head>
            <title> {blog.title}| {APP_NAME} </title>
            <meta name="description" content={blog.mdesc}/>
            <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`}/>
            <meta property="og:title" content={`${blog.title}| ${APP_NAME}`}/>
            <meta property="og:description" content={blog.mdesc}/>

            <meta property="og:type" content="website"/>
            <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>

            <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`}/>
            <meta property="og:image:secure_url" content={`${API}/blog/photo/${blog.slug}`}/>
            <meta property="og:image:type" content="image/png"/>
            <meta property="fb:app_id" content={`${APP_NAME}`}/>
        </Head>
    }


    const showBlogCategories=blog=>
    blog.categories.map((c,i)=>(
        <Link key={i} href={`/categories/${c.slug}`}>
            <a className="btn btn-primary mr-1 ml-1 mt-3">
                {c.name}
            </a>
        </Link>
    ))


    const showBlogTags=blog=>
        blog.categories.map((t,i)=>(
            <Link key={i} href={`/tags/${t.slug}`}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3">
                    {t.name}
                </a>
            </Link>
        ));

        const showRelatedBlog=()=>{
            return related.map((blog,i)=>{
                return <div className="col-md-4" key={i}>
                    <article>
                        <SmallCard blog={blog}/>
                    </article>
                </div>
            })
        }

    return <React.Fragment>
        {head()}
        <Layout>
            <main>
                <article>
                    <div className="container-fluid">
                        <section>
                            <div className="row" style={{marginTop: '-30px'}}>
                                <img src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} className="img img-fluid featured-image"/>
                            </div>
                        </section>
                        <section>
                            <div className="container">
                                <h1 className="display-2 pb-3 text-center font-weight-bold pt-3 ">{blog.title}</h1>
                                <p className="lead mt-3 mark">
                                Written By {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()}
                                </p>
                                <div className="pb-3">
                                    {showBlogCategories(blog)}
                                    {showBlogTags(blog)}
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="container">
                        <section>
                            <div className="col-md-12 lead">
                                {renderHTML(blog.body)}
                            </div>
                        </section>
                    </div>
                    <div className="container pb-5">
                        <h4 className="text-center pt-5 pb-5 h2">
                            Related Blogs
                        </h4>
                        <div className="row">
                            {showRelatedBlog()}
                        </div>
                        <hr />

                    </div>

                    <div className="container pb-5">
                        <h4 className="text-center pt-5 pb-5 h2">
                            Comments 
                        </h4>
                        <hr />
                    </div>
                </article>
            </main>
        </Layout>
    </React.Fragment>


}


SingleBlog.getInitialProps=({query})=>{
    return singleBlog(query.slug).then(data=>{
        if(data.error){
            console.log(data.error)
        }else{
            // console.log('Get initial prop Single Blog', data)
            return {blog: data, query}
        }
    })
}

export default SingleBlog