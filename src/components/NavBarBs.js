import React, {Component} from 'react'
import {Navbar, Nav, NavItem} from 'react-bootstrap'

class NavBarBs extends Component {

    render() {
        return (
            <Navbar inverse collapseOnSelect >
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href = "#home" > Line - Tools </a> 
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>

                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey = {1} href = "#">
                            Link
                        </NavItem>
                        <NavItem eventKey = {2} href = "#">
                            Link 
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavBarBs