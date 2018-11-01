import React, { Component } from 'react'

import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import { Provider } from 'react-redux'

import AppHeader  from './components/Header'
import AppFooter  from './components/Footer'
import Parse from './components/Parse'
import Home from './components/Home'
import Test from './components/Test'

import store from './stores'


class App extends Component {

    render() {
        const navsItems = [
            {path: '/', label: 'Home'},
            {path: '/testA', label: 'TestA'},
            {path: '/parse', label: 'Parse'},
            {path: '/todo', label: 'Todo'},
        ]

        return (
            <Provider store={ store }>
                <Router>
                    <div className="app">
                        <AppHeader datas={ navsItems } />

                        <main>
                            <Container fluid>
                                <Row>
                                    <Col md={12} style={ { textAlign:'center' } }>
                                        <Switch>
                                            <Route exact path="/" component={ Home } />
                                            <Route path="/testA" component={ props => <Test {...props} content="test A" /> } />
                                            <Route path="/parse" component={ Parse } />
                                            <Route path="/todo" component={ Parse } />
                                            <Redirect to="/" />
                                        </Switch>
                                    </Col>
                                </Row>
                            </Container>
                        </main>

                        <AppFooter />
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App