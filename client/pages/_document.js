import Document, {Html, Head, Main, NextScript} from 'next/document'
import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig()

class MyDocument extends Document{


    setGoogleTags(){
        if(publicRuntimeConfig.PRODUCTION){
            return {
                // avoid <script> </script>
                __html:`

                `
//              Code Above
            }
        }
    }


    render(){
        return(
            <Html lang="en">
                <Head>
                    <meta charSet="UTF-8"/>
                    <link rel="stylesheet" href="/static/css/styles.css"/> 
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"></link>
                    {/* <script src="manager google analytics script"></script> */}
                    <script dangerouslySetInnerHTML={this.setGoogleTags()}> </script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument