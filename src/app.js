import React, { Component } from 'react'

import NavBarBs from './components/NavBarBs'
import HelloWorld from './components/Helloworld'

class App extends Component {
    
    render() {
        return (
            <div>
                <NavBarBs />
                <HelloWorld content = "今天就開始!" />
            </div>
        )
    }
}

export default App