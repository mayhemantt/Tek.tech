import Layout from '../../../components/Layout'
import Link from 'next/link'
import Admin from '../../../components/auth/Admin'
import Category from '../../../components/crud/Category'
import Tag from '../../../components/crud/Tag'


const CategoryTag=()=>{
    return(
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5" style={{textAlign:"center"}}>
                            <h2>
                                Category And Tag Center
                            </h2>
                        </div>
                        <div className="col-md-6">
                            <h3 style={{textAlign:"center"}}> Manage Categories</h3>
                           <Category />
                        </div>
                        <hr/>
                        <div className="col-md-6">
                            <h3 style={{textAlign:"center"}}> Manage Tags</h3>
                            <Tag />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}

export default CategoryTag