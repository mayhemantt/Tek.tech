import Layout from '../components/Layout'
import Link from 'next/link'
import SignupComponent from '../components/auth/SignupComponent'
const Signup=()=>{
    return(
        <Layout>
            <h2>Signup</h2>
            <SignupComponent />
        </Layout>
    )
}

export default Signup