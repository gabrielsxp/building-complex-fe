import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink, withRouter } from 'react-router-dom';
import {getBuilding} from '../services/auth';
import styled from 'styled-components';

const Styles = styled.div`
.navbar {
    z-index: 999;
}
.navbar-light .navbar-brand {
    color: #fff;
}
@media(min-width: 992px){
    .bg-light {
        background-color: transparent!important;
        border-bottom: 1px solid rgba(255,255,255,0.5)!important;
    }
    .bg-light .nav-link {
        color: #dedede;
    }
    .bg-light .nav-link.active {
        color: #fff;
    }
    .bg-light .nav-link:hover {
        color: #fff;
    }
    .bg-light .nav-link.active:hover {
        color: #dedede;
    }
}
@media (max-width: 991px){
    .bg-light .navbar-brand.active {
        color:#333;
    }
    .bg-dark .navbar-brand.active {
       color: #fff;
    }
}
`;

class Navigation extends React.Component {
    componentDidMount(){
        console.log(getBuilding());
    }
    render() {
        const location = this.props.location.pathname === '/' ? true : false;
        return (
            <Styles>
                <Navbar collapseOnSelect expand="lg" bg={location ? "light" : "dark"} variant={location ? "light" : "dark"}>
                    <NavLink className="navbar-brand" to="/">BuildingComplex</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink className="nav-link" to="/app">Aplicação</NavLink>
                            <NavLink className="nav-link" to="/tests">Testes</NavLink>
                        </Nav>
                        <Nav>
                            {
                                getBuilding() ? <Navbar.Text>{`Prédio atual: ${getBuilding()}`}</Navbar.Text> : null
                            }
                            &nbsp;&nbsp;
                            {
                                <Navbar.Text><b style={{color: '#1aff1a'}}>N→S: {this.props.i%5 + 1}</b></Navbar.Text>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Styles>
        )
    }
}

export default withRouter(Navigation);