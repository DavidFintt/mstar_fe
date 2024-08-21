import "./index.css"
import truckIcon from "../../assets/sidebar/icons/truck-icon.png"
import unidadeIcon from "../../assets/sidebar/icons/unidade-icon.png"
import estoqueIcon from "../../assets/sidebar/icons/estoque-icon.png"
import enterIcon from "../../assets/sidebar/icons/enter-icon.png"
import { Link } from "react-router-dom"


export default function Sidebar() {
    return(
        <>
            <div id="sidebar-main">
                <div className="sidebar-header">
                    <span className="header-title"> MSTAR </span>
                </div>
                <div className="container-menus-sidebar">
                    <Link className="sidebar-menu-link" to="/movimentacoes/cadastro">
                        <div className="sidebar-menus">
                            <img className="icon-menu-sidebar" src={enterIcon}></img>
                            <span className="menu-sidebar-link">
                                CADASTRAR MOVIMENTO
                            </span>
                        </div>
                    </Link>
                </div>
                <div className="container-menus-sidebar">
                    <Link className="sidebar-menu-link" to="/mercadorias">
                        <div className="sidebar-menus">
                            <img className="icon-menu-sidebar" src={estoqueIcon}></img>
                            <span className="menu-sidebar-link">
                                MERCADORIAS
                            </span>
                        </div>
                    </Link>
                </div>
                <div className="container-menus-sidebar">
                    <Link className="sidebar-menu-link" to="/movimentacoes">
                        <div className="sidebar-menus">
                            <img className="icon-menu-sidebar" src={truckIcon}></img>
                            <span className="menu-sidebar-link">
                                MOVIMENTAÇÕES
                            </span>
                        </div>
                    </Link>
                </div>
                <div className="container-menus-sidebar">
                    <Link className="sidebar-menu-link" to="/unidades">
                        <div className="sidebar-menus">
                            <img className="icon-menu-sidebar" src={unidadeIcon}></img>
                            <span className="menu-sidebar-link">
                                UNIDADES
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}