import React, { useState, useEffect } from 'react';
import { 
    Navbar, NavbarBrand, NavLink, NavItem, Nav, NavbarToggler, Collapse, Dropdown, DropdownToggle, DropdownMenu, DropdownItem 
} from 'reactstrap';
import { Link } from 'react-router-dom';
import tokenService from './services/token.service';
import jwt_decode from "jwt-decode";
import { CiSearch, CiUser } from "react-icons/ci";

function AppNavbar() {
    const [roles, setRoles] = useState([]);
    const [username, setUsername] = useState("");
    const jwt = tokenService.getLocalAccessToken();
    const [collapsed, setCollapsed] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleNavbar = () => setCollapsed(!collapsed);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    useEffect(() => {
        if (jwt) {
            setRoles(jwt_decode(jwt).authorities);
            setUsername(jwt_decode(jwt).sub);
        }
    }, [jwt]);

    let publicLinks = (
        <>
            <NavItem>
                <NavLink style={{ color: "white", fontFamily: 'Source Sans Pro' }} id="TOTAL LOOK" tag={Link} to="/docs">TOTAL LOOK</NavLink>
            </NavItem>
            <NavItem>
                <NavLink style={{ color: "white", fontFamily: 'Source Sans Pro' }} id="A MEDIDA" tag={Link} to="/plans">A MEDIDA</NavLink>
            </NavItem>
            <NavItem>
                <NavLink style={{ color: "white", fontFamily: 'Source Sans Pro' }} id="COLECCIONES" tag={Link} to="/register">COLECCIONES</NavLink>
            </NavItem>
            <NavItem>
                <NavLink style={{ color: "white", fontFamily: 'Source Sans Pro' }} id="CATALOGOS" tag={Link} to="/register">CATALOGOS</NavLink>
            </NavItem>
            <NavItem>
                <NavLink style={{ color: "white", fontFamily: 'Source Sans Pro' }} id="KUBICO" tag={Link} to="/register">KUBICO</NavLink>
            </NavItem>
            <NavItem>
                <NavLink style={{ color: "white", fontFamily: 'Source Sans Pro' }} id="GRUPO BONO" tag={Link} to="/register">GRUPO BONO</NavLink>
            </NavItem>
            <NavItem>
                <NavLink style={{ color: "white", fontFamily: 'Source Sans Pro' }} id="ACTUALIDAD" tag={Link} to="/register">ACTUALIDAD</NavLink>
            </NavItem>
            <NavItem>
                <NavLink style={{ color: "white", fontFamily: 'Source Sans Pro' }} id="CONTACTO" tag={Link} to="/register">CONTACTO</NavLink>
            </NavItem>
            <div className="d-flex align-items-center" style={{ marginRight: '10px' }}>
                <CiSearch style={{ color: 'white', fontSize: 30, cursor: 'pointer', marginRight: '15px' }} />
                <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
                    <DropdownToggle nav style={{ color: "white", cursor: 'pointer' }}>
                        <CiUser style={{ fontSize: 30 }} />
                    </DropdownToggle>
                    <DropdownMenu end>
                        <DropdownItem tag={Link} to="/login">Iniciar sesión</DropdownItem>
                        <DropdownItem tag={Link} to="/register">Registrarse</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </>
    );

    return (
        <div>
            <Navbar expand="md" style={{ backgroundColor: 'rgb(77,86,80)' }}>
                <NavbarBrand href="/">
                    <img 
                        alt="logo" 
                        src="https://kubicoarmarios.com/wp-content/uploads/thegem-logos/logo_5ca063ef8f9677b5335b1f6a7ffd00a1_2x.png" 
                        style={{ height: 80, width: 150, marginLeft: 80 }} 
                    />
                </NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="ms-2" />
                <Collapse isOpen={!collapsed} navbar>
                    <Nav className="ms-auto mb-2 mb-lg-0" navbar>
                        {publicLinks}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default AppNavbar;
