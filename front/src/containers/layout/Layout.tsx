import Footer from "../footer/Footer"
import Header from "../header/Header"
import classes from './layout.module.css'

type LayoutProps = {
    children: React.ReactNode
}

const Layout = ({children}: LayoutProps) => {

    return(
        <div className={classes.layout}>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout