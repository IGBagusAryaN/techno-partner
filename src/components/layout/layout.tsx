import { Outlet } from "react-router"
import Footer from "../bar/footer"

export const Layout = () => {
    return(
        <div className="md:px-[560px]">
            <Outlet/>
            <Footer/>
        </div>
    )
}