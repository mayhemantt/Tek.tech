import Layout from '../components/Layout'
import Link from 'next/link'
import Head from 'next/head'

const Index=()=>{

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
            <div className="container mb-4">
                <h1 className="text-center mb-4">Index page</h1>
                <h4>Lorem, ipsum.</h4>
                <div className="row mb-2">
                    <div className="col-md-4 mr-2">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quae tempora esse nisi! Voluptates ullam fuga, veniam mollitia nobis praesentium natus nulla iure quod cum? Minima laudantium sit eos. Temporibus est natus eligendi, beatae sapiente quia numquam maiores labore distinctio. Molestias odit optio nostrum animi rem porro illo ipsa enim, similique numquam quidem aut, vitae, voluptatum quibusdam! Omnis, neque? Nobis, nesciunt! Recusandae saepe iure labore aspernatur suscipit eius porro corporis dolores! Unde eius sit quisquam aperiam. Quis obcaecati perferendis exercitationem quia. Incidunt saepe, ratione eveniet magni ipsa libero, inventore perspiciatis minima laudantium blanditiis unde laborum corrupti ea hic quibusdam quis assumenda provident eius voluptatum voluptate? Perferendis cumque assumenda accusamus libero, ea excepturi deleniti blanditiis ex quasi vero alias. Error harum, voluptas saepe blanditiis inventore optio id quas consectetur laudantium nulla tempore? Sed, quia quod! Ea impedit nemo deleniti modi corporis totam maxime doloremque, aspernatur quisquam vero corrupti, nostrum itaque? Iusto voluptates eius labore necessitatibus perferendis vitae esse voluptate dignissimos maxime cupiditate obcaecati, optio, dolorem quasi veniam eligendi facilis magnam quisquam non quibusdam nam vero exercitationem ipsa doloremque recusandae? Magnam ipsam deleniti nulla facilis fugit delectus sit repudiandae temporibus, earum doloremque sint, dicta, facere deserunt beatae repellat. Voluptate veritatis beatae dolor.
                        </p>
                    </div>
                    <div className="col-md-6">
                        <h5>
                            eos commodi necessitatibus. At ut debitis qui, cupiditate dolorem architecto officiis magnam repellendus molestias, numquam blanditiis saepe provident quas aspernatur voluptate eveniet veniam recusandae laborum voluptatem earum.
                        </h5>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Index