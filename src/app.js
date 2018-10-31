import React, { Component } from 'react'

import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import AppHeader  from './components/Header'
import AppFooter  from './components/Footer'
import Test from './components/Test'
import Parse from './components/Parse'
import Home from './components/Home'

class App extends Component {

    render() {
        const navsItems = [
            {path: '/', label: 'Home'},
            {path: '/testA', label: 'TestA'},
            {path: '/testB', label: 'TestB'},
            {path: '/parse', label: 'Parse'},
        ]

        return (
            <Router>
                <div className="app">
                    <AppHeader datas={navsItems} />

                    <main>
                        <Container fluid>
                            <Row>
                                <Col md={2}> Sidebar </Col>
                                <Col md={10}>
                                    <Switch>
                                        <Route exact path="/" component={ Home } />
                                        <Route path="/testA" component={ props => <Test {...props} content="test C" /> } />
                                        <Route path="/testB" component={ props => <Test {...props} content="test B" /> } />
                                        <Route path="/Parse" component={ Parse } />
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

export default App