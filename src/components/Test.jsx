import React, { Component } from 'react'

export default class Test extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <h5>{ this.props.content }</h5>
    }
}