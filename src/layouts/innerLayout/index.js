import Sidebar from "../../components/sidebar"
import "./index.css"
export default function InnerLayout({children}){
    return (
        <>
        <Sidebar />
        <div id="layout-main">
            {children}
        </div>
        </> 
    )
}