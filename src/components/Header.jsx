import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class Header extends Component {

    render() {
        const { datas } = this.props

        const navItems = datas.map((item, key) => {
            return (
                <LinkContainer to={ item.path } key={ key }>
                    <Nav.Link>{ item.label }</Nav.Link>
                </LinkContainer>
            )
        })

        return (
            <Navbar bg="light" expand="lg">
                <LinkContainer to="/">
                    <Navbar.Brand> React - Training </Navbar.Brand>
                </LinkContainer>
                
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        { navItems }
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl type="text" placeholder="Search" className="me-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header