import React from 'react';
import { Container,Navbar } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';



  

const Header = () => {

    return (
     
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                <LinkContainer to="/">   
                    <Navbar.Brand >User Hub</Navbar.Brand>
                </LinkContainer>
                     <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        {/* <Navbar.Collapse style={{flexGrow: "0",alignItems: "right"}} id="basic-navbar-nav">
                                <Nav className="ml-auto">
                                    <NavDropdown title='Admin' id='adminmenu' >
                                        <LinkContainer to="/admin/userlist">
                                            <NavDropdown.Item>Users</NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to="/admin/productList">
                                            <NavDropdown.Item>Products</NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to="/admin/orderList">
                                            <NavDropdown.Item>Orders</NavDropdown.Item>
                                        </LinkContainer>
                                   </NavDropdown>
                                </Nav>
                        </Navbar.Collapse> */}
                  </Container>
                </Navbar>
        </header>
    )
}

export default Header
