import React, { useState, useEffect } from 'react';
import { Navbar, NavbarBrand, NavLink, NavItem, Nav, NavbarText, NavbarToggler, Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import tokenService from './services/token.service';
import jwt_decode from "jwt-decode";

function AppNavbar() {
    const [roles, setRoles] = useState([]);
    const [username, setUsername] = useState("");
    const jwt = tokenService.getLocalAccessToken();
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    useEffect(() => {
        if (jwt) {
            setRoles(jwt_decode(jwt).authorities);
            setUsername(jwt_decode(jwt).sub);
        }
    }, [jwt])

    let adminLinks = <></>;
    let clienteLinks = <></>;
    let interioristaLinks = <></>;
    let montadorLinks = <></>;
    let userLinks = <></>;
    let userLogout = <></>;
    let publicLinks = <></>;

    roles.forEach((role) => {
        if (role === "ADMIN") {
            adminLinks = (
                <>
                   
                    <NavItem>
                        <NavLink style={{ color: "white" }} tag={Link} to="/administrarUsuarios">Administrar usuarios</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ color: "white" }} tag={Link} to="/pedidosAdmin">Lista de pedidos</NavLink>
                    </NavItem>
                </>
            )
        }
        if (role === "CLIENTE") {
            clienteLinks = (
                <>
                   <NavItem>
                    <NavLink style={{ color: "white" }} tag={Link} to="/pedidosCliente">Mis pedidos</NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink style={{ color: "white" }} tag={Link} to="/diseños">Mis diseños</NavLink>
                    </NavItem>
                </>
            )
        }
        if (role === "INTERIORISTA") {
            interioristaLinks = (
                <>
                    <NavItem>
                        <NavLink style={{ color: "white" }} tag={Link} to="/chats">Chats</NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink style={{ color: "white" }} tag={Link} to="/pedidosInteriorista">Pedidos por revisar</NavLink>
                    </NavItem>
                </>
            )
        }

        if (role === "MONTADOR") {
            montadorLinks = (
                <>
                    <NavItem>
                    <NavLink style={{ color: "white" }} tag={Link} to="/pedidosMontador">Pedidos por montar</NavLink>
                    </NavItem>
                </>
            )
        }
    })

    if (!jwt) {
        publicLinks = (
            <>
                <NavItem>
                    <NavLink style={{ color: "white" }} id="register" tag={Link} to="/register">Registrarse</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink style={{ color: "white" }} id="login" tag={Link} to="/login">Iniciar sesion</NavLink>
                </NavItem>
            </>
        )
    } else {
        userLinks = (
            <>

            </>
        )
        userLogout = (
            <>
                <NavItem>
                    <NavLink style={{ color: "white" }} id="docs" tag={Link} to="/docs">Docs</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink style={{ color: "white" }} id="plans" tag={Link} to="/plans">Pricing Plans</NavLink>
                </NavItem>
                <NavbarText style={{ color: "white" }} className="justify-content-end">{username}</NavbarText>
                <NavItem className="d-flex">
                    <NavLink style={{ color: "white" }} id="logout" tag={Link} to="/logout">Cerrar sesion</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink style={{ color: "white" }} id= "mi perfil" tag={Link} to="/profile">Mi perfil</NavLink>
                </NavItem>
            </>
        )

    }

    return (
        <div>
            <Navbar expand="md" dark color="dark">
                <NavbarBrand href="/">
                    <img alt="logo" src="logo2-recortado.png" style={{ height: 40, width: 200 }} />
                </NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="ms-2" />
                <Collapse isOpen={!collapsed} navbar>
                    <Nav className="me-auto mb-2 mb-lg-0" navbar>
                        {userLinks}
                        {adminLinks}
                        {clienteLinks}
                        {interioristaLinks}
                        {montadorLinks}
                    </Nav>
                    <Nav className="ms-auto mb-2 mb-lg-0" navbar>
                        {publicLinks}
                        {userLogout}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default AppNavbar;