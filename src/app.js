import React, { Component } from 'react'
import HelloWorld from './components/Helloworld'

class App extends Component {
    render() {
        return ( 
            <HelloWorld text = "今天就開始學React!" />
        )
    }
}

export default App