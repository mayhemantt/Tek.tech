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
            <h2 className="text-center">Index page</h2>
            <h4>Lorem, ipsum.</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo quae modi quasi sed saepe deserunt quas sapiente, dicta suscipit accusantium consequatur ipsam eveniet porro earum dolorum tempore sint similique voluptatibus repellat? Aut accusamus minima eveniet tempore dolores asperiores modi ratione eaque natus officiis, quasi quia labore dignissimos reprehenderit rem dicta quae ea unde ad, sint non id doloremque similique. Alias sapiente perferendis blanditiis magnam corrupti harum, adipisci quasi! Eaque incidunt earum provident qui voluptate quaerat perferendis, itaque voluptatibus ducimus quisquam neque, laboriosam nostrum ab adipisci sequi temporibus. Delectus, repudiandae deleniti aliquid ipsum quod tenetur corrupti molestiae error eaque, beatae, voluptatibus qui voluptas inventore eligendi nostrum et. Nisi ad autem minus quos quia, non esse assumenda vero necessitatibus odio animi fugit dolores optio obcaecati cumque laudantium itaque dolore! Id iste quidem necessitatibus, voluptates harum voluptate ipsum odio libero facilis et numquam ea cupiditate impedit, error veniam reiciendis nesciunt beatae. Quo incidunt, nemo dolore similique earum, error vitae aliquid cum dolor sunt labore quos assumenda unde eligendi recusandae culpa repellat omnis laboriosam velit architecto neque id suscipit harum. Quas rem ipsam mollitia libero corrupti quam illo, a excepturi. Maiores illo aliquam sint. Molestias eum excepturi libero quis illum amet magnam molestiae accusamus.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea laudantium doloribus porro eum illum nesciunt ducimus provident accusantium eaque aliquid, qui perferendis veniam voluptate enim quis dicta, modi itaque laboriosam.</p>
        </Layout>
    )
}

export default Index