import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Row, Col, Button, Form } from 'react-bootstrap'

class TodoList extends Component {
    constructor(props) {
        super(props)

        this.handelDel = this.handelDel.bind(this)
        this.handelAdd = this.handelAdd.bind(this)
    }

    handelDel(e) {
        const delIndex = e.target.getAttribute('data-key')

        this.props.onDel(delIndex)
    }

    handelAdd(e) {

    }

    render() {
        return <>
                <Form>
                    <Form.Group controlId="add_new">
                        <Form.Label>Add New</Form.Label>
                        <Form.Control type="text" placeholder="write" />
                        <Form.Text className="text-muted">
                            新增項目
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" onClick={ this.handelAdd }>
                        Add
                    </Button>
                </Form>

                <ul>
                    {this.props.todolist.map((item, i) => {
                        return <li key={i}>
                                <Row className="justify-content-md-center">
                                    <Col xs={8}>{item.text}</Col>
                                    <Col xs="auto">
                                        <Button onClick={ this.handleDel }>
                                            DEL
                                        </Button>
                                    </Col>
                                </Row>
                            </li>;
                    })}
                </ul>
            </>;
    }
}

export default TodoList