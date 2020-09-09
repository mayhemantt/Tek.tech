import moment from 'moment'
import Link from 'next/link'
import renderHTML from 'react-render-html'
import {API} from '../../config'

const SmallCard= ({blog})=>{

    return (
        <div className="card">
            <section>
                <Link href={`/blogs/${slug}`}>
                    <a>
                    <img src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} style={{maxHeight:'150px', width: 'auto'}} className="img img-fluid"/>  
                    </a>
                </Link>
            </section>
            <div className="card-body">
                <section>
                <Link href={`/blogs/${slug}`}>
                    <h5 className="card-title">{blog.title}</h5> 
                </Link>
                </section>
            </div>
        </div>
        <div className="lead pb-4">
                    <header>
                        <Link href={`/blogs/${blog.slug}`}>
                            <a>
                                <h2 className="pt-3 pb-3 font-weight-bold">{blog.title}</h2>
                            </a>
                        </Link>
                    </header>
                    <section>
                        <p className="mark ml-1 pt-2 pb-2">
                            Written By {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()}
                        </p>
                    </section>
                    <div className="row">
                        <div className="col-md-4">
                            <section>
                                <img src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} style={{maxHeight:'150px', width: 'auto'}} className="img img-fluid"/>
                            </section>
                        </div>
                        <div className="col-md-8">
                            <section>
                                <div className="pb-3">{renderHTML(blog.excerpt)}</div>
                                <Link href={`/blogs/${blog.slug}`}>
                                    <a className="btn btn-primary pt-2">
                                        Read More
                                    </a>
                                </Link>
                            </section>
                        </div>
                    </div>
                </div>
    )
}

export default SmallCard