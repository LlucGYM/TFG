import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "wouter";
import PopupAfegirDiners from "./PopupAfegirDiners";
import PopupAfegirMenu from "./AfegirMenu";

export class Navegador extends React.Component {
    componentDidMount() {
        this.props.funcionsaldo();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        return(
            <Navbar className="NavMenu" bg="dark" expand="lg" variant="dark">
                <div className="container">
                    <Navbar.Brand href="/Homepage">
                        <i className="fas fa-apple-alt" style={{color: "#CE33FF"}}/>
                        FastTickets
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href={"/Homepage"}>Inici</Nav.Link>
                            {this.props.rol === 'Admin' ?
                                <>  <Nav.Link><Link to={"/TotsInfants"}>Infants</Link></Nav.Link>
                                    <Nav.Link><Link to={"/AfegirMenu"}>Menus</Link></Nav.Link>
                                    <Nav.Link><Link to={"/Registre"}>Registrar Usuaris</Link></Nav.Link></>
                                :
                                <Nav.Link><Link to={"/VistaTiquets"}>Reserves</Link></Nav.Link> }
                            <NavDropdown title={this.props.name} id="basic-nav-dropdown">
                                {this.props.rol === 'Admin' ? null : <NavDropdown.Item><PopupAfegirDiners/></NavDropdown.Item>}
                                <NavDropdown.Item>Canviar Contrasenya</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={this.props.onClick}>Tanca sessió</NavDropdown.Item>
                            </NavDropdown>
                            {this.props.rol !== 'Admin' ? <Nav.Link >Disponible: {this.props.saldo}€</Nav.Link> : null }
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>


        );
    }
}