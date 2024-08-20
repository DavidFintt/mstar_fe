import "./index.css"
import clockIcon from "../../assets/sidebar/icons/clock.png"
import plusIcon from "../../assets/sidebar/icons/plus-icon.png"
import truckIcon from "../../assets/sidebar/icons/truck-icon.png"
import unidadeIcon from "../../assets/sidebar/icons/unidade-icon.png"
import estoqueIcon from "../../assets/sidebar/icons/estoque-icon.png"

export default function Sidebar() {
    return(
        <>
            <div id="sidebar-main">
                <div className="sidebar-header">
                    <span className="header-title"> MSTAR </span>
                </div>
                <div className="container-menus-sidebar">
                    <a className="sidebar-menu-link" href="/mercadorias/">
                        <div className="sidebar-menus">
                            <img className="icon-menu-sidebar" src={estoqueIcon}></img>
                            <span className="menu-sidebar-link">
                                MERCADORIAS
                            </span>
                        </div>
                    </a>
                </div>
                <div className="container-menus-sidebar">
                    <div className="sidebar-menus">
                        <img className="icon-menu-sidebar" src={truckIcon}></img>
                        <span className="menu-sidebar-link">
                            MOVIMENTAÇÕES
                        </span>
                    </div>
                </div>
                <div className="container-menus-sidebar">
                        <div className="sidebar-menus">
                            <img className="icon-menu-sidebar" src={unidadeIcon}></img>
                            <span className="menu-sidebar-link">
                                UNIDADES
                            </span>
                    </div>
                </div>
            </div>
        </>
    )
}