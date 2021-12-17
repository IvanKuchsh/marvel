import { Link, NavLink } from "react-router-dom";

import './appHeader.scss'

const AppHeader = () => {

    return (
        <header className="appHeader">
            <Link to="/" className="appHeader__title">
                <span>Marvel</span> information portal
            </Link>
            <nav className="appHeader__menu">
                <NavLink 
                    exact
                    className="appHeader__menu-link" 
                    activeClassName="appHeader__menu-link_active" 
                    to="/">Characters</NavLink> 
                / 
                <NavLink 
                    className="appHeader__menu-link" 
                    activeClassName="appHeader__menu-link_active" 
                    to="/comics">Comics</NavLink>
            </nav>
        </header>
    )
}

export default AppHeader;