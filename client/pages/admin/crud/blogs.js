import Layout from '../../../components/Layout'
import Link from 'next/link'
import Admin from '../../../components/auth/Admin'
import ReadBlogs from '../../../components/crud/BlogRead'

const Blogs=()=>{
    return(
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5" style={{textAlign:"center"}}>
                            <h2>
                                Manage Blogs 
                            </h2>
                        </div>
                        <div className="col-md-12">
                            <ReadBlogs />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}

export default Blogs