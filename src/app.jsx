import React, { Component } from 'react'

import { Route, Routes, Navigate, BrowserRouter as Router } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

import { Provider } from 'react-redux'
import store from './stores'

import AppHeader  from './components/Header'
import AppFooter  from './components/Footer'
import Parse from './components/Parse'
import Home from './components/Home'
import Test from './components/Test'
import TodoRoute from './routes/TodoRoute'

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
                                        <Routes>
                                            <Route path="/" element={ <Home /> } />
                                            <Route path="/testA" element={ <Test content="test A" /> } />
                                            <Route path="/parse" element={ <Parse /> } />
                                            <Route path="/todo/*" element={ <TodoRoute /> } />
                                            <Route path="*" element={ <Navigate to="/" replace /> } />
                                        </Routes>
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