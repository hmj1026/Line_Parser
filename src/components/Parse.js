import React, { Component } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
export default class Parse extends Component {
    constructor(props) {
        super(props)
        this.uploadChange = this.uploadChange.bind(this)
    }

    uploadChange(e) {
        console.log(e.target.files)
    }

    render() {
        return (
            <Container fluid>
                <Row className="justify-content-md-center">

                    <div className='page-header'>
                        Parse
                    </div>
                    <Col md={12}>
                        
                    </Col>
                    <Col md={12}>
                        <Form>
                            <Form.Group controlId="upload">
                                <Form.Label>檔案上傳</Form.Label>
                                <Form.Control type="file" placdeholder="請選擇上傳檔案" size="sm" onChange={ this.uploadChange } />
                                <Form.Text className="text-muted">上傳檔案</Form.Text>
                            </Form.Group>

                            <Button variant="primary" type="submit">上傳</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}