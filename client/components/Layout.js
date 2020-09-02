import Header from './Header'

const Layout =({children})=>{
    return (
        <React.Fragment>
            <Header/>
                {children}
            <p>Footer</p>
        </React.Fragment>
    )
}


export default Layout