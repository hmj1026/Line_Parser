import React, { Component } from 'react'

import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import AppHeader  from './components/Header'
import AppFooter  from './components/Footer'
import Test from './components/Test'
import Home from './components/Home'

export default class App extends Component {
    render() {
        return (
            <Router>
                <div className="app">
                    <AppHeader />

                    <main>
                        <Container fluid>
                            <Row>
                                <Col md={2}> Sidebar </Col>
                                <Col md={10}>
                                    <Switch>
                                        <Route exact path="/" component={ Home } />
                                        <Route path="/testA" component={ props => <Test {...props} content="test C" /> } />
                                        <Route path="/testB" component={ props => <Test {...props} content="test B" /> } />
                                        <Redirect to="/" />
                                    </Switch>
                                </Col>
                            </Row>
                        </Container>
                    </main>

                    <AppFooter />
                </div>
           </Router>
        )
    }
}