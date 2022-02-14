import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Modal, Button } from 'react-bootstrap';

import { updateStudent } from './../redux/actions/students';

const UpdateRecord = props => {
    const dispatch = useDispatch();
    const firstNameRef = useRef(props.item.firstName);
    const lastNameRef = useRef(props.item.lastName);
    const nationalityRef = useRef(props.item.nationality);
    const dobRef = useRef(props.dob);
    const currentProfile = useSelector(state => state.profile.currentProfile);
    let disableEdit = true;
    if (currentProfile === 'Registrar')
        disableEdit = false;


    const updateRecord = () => {
        const payload = {
            studentId: props.item._id,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            nationality: nationalityRef.current.value,
            dob: dobRef.current.value,
        }
        dispatch(updateStudent(payload));
        props.closeHandler();
    }
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Update Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="input" placeholder="Enter first name" ref={firstNameRef} disabled={disableEdit} defaultValue={props.item.firstName} />
                        </Col>
                        <Col>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="input" placeholder="Enter first name" ref={lastNameRef} disabled={disableEdit} defaultValue={props.item.lastName} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Nationality</Form.Label>
                            <Form.Select aria-label="Nationality" ref={nationalityRef} disabled={disableEdit}>
                                {props.nationalities.map(nation => {
                                    if (nation === props.item.nationality)
                                        return (<option value={nation} selected>{nation}</option>)
                                    return (<option value={nation}>{nation}</option>)
                                })}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Label>Select Date Of Birth</Form.Label>
                            <Form.Control type="date" name="dob" placeholder="Date of Birth" ref={dobRef} defaultValue={props.item.dob} disabled={disableEdit} />
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.closeHandler}>
                    Cancel
                </Button>
                {!disableEdit &&
                    (<Button variant="primary" onClick={updateRecord}>
                        Update
                    </Button>)
                }

            </Modal.Footer>
        </>

    )
}

export default UpdateRecord;