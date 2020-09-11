import Layout from '../../../components/Layout'
import Admin from '../../../components/auth/Admin'
import BlogUpdate from '../../../components/crud/BlogUpdate'

const UpdateBlog=()=>{
    return(
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5" style={{textAlign:"center"}}>
                            <h2>
                                Category A New Blog
                            </h2>
                        </div>
                        <div className="col-md-12">
                            <h3 style={{textAlign:"center"}}>Blog</h3>
                           <BlogUpdate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}

export default UpdateBlog