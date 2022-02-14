import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { Form, Row, Col, Modal, Button } from 'react-bootstrap';

import { addStudent } from './../redux/actions/students';

const CreateRecord = props => {
    const dispatch = useDispatch();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const nationalityRef = useRef();
    const dobRef = useRef();

    const createNewRecord = () => {
        const payload = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            nationality: nationalityRef.current.value,
            dob: dobRef.current.value,
        }
        dispatch(addStudent(payload));
        props.closeHandler();
    }
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Create Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="input" placeholder="Enter first name" ref={firstNameRef} />
                        </Col>
                        <Col>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="input" placeholder="Enter first name" ref={lastNameRef} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Nationality</Form.Label>
                            <Form.Select aria-label="Nationality" ref={nationalityRef}>
                                {props.nationalities.map(nation => {
                                    return <option value={nation}>{nation}</option>
                                })}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Label>Select Date Of Birth</Form.Label>
                            <Form.Control type="date" name="dob" placeholder="Date of Birth" ref={dobRef} />
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.closeHandler}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={createNewRecord}>
                    Submit
                </Button>
            </Modal.Footer>
        </>

    )
}

export default CreateRecord;