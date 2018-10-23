import React, { Component } from 'react'

class HelloWorld extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return <h5>{ this.props.content }</h5>
    }
}

export default HelloWorld