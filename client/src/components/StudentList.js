import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

import { UPDATE_PROFILE } from './../redux/actions/types';

import CreateRecord from './CreateRecord';
import UpdateRecord from './UpdateRecord';

import { fetchStudentList, approveStudent } from './../redux/actions/students';

const nationalities = ['United Arab Emirates', 'India'];

const profiles = ['Admin', 'Registrar']

const StudentList = props => {

    const dispatch = useDispatch();
    const studentList = useSelector(state => state.students.studentList);
    const currentProfile = useSelector(state => state.profile.currentProfile);
    const [modal, setModal] = useState({
        isOpen: false,
        type: '',
    });
    const [selectedRecord, setSelectedRecord] = useState({});
    const handleClose = () => {
        setModal({ isOpen: false })
    }

    const updateProfile = (event) => {
        dispatch({ type: UPDATE_PROFILE, payload: event.target.value });
    }

    const updateRecord = (e, item) => {
        e.preventDefault();
        setModal({ isOpen: true, type: 'edit' })
        setSelectedRecord(item);
    }
    const approveRecord = (e, item) => {
        e.preventDefault();
        dispatch(approveStudent(item))
    }
    useEffect(() => {
        console.log('Inside useEffect');
        dispatch(fetchStudentList())
    }, [dispatch]);
    return (
        <div className="content">
            <Row className="mt-3">
                <Col md={4}>
                    <Form.Label>Choose Profile:</Form.Label>
                    <Form.Select aria-label="Choose Profile" onChange={updateProfile}>
                        {profiles.map(profile => {
                            if (currentProfile === profile)
                                return <option value={profile} selected>{profile}</option>
                            return <option value={profile}>{profile}</option>
                        })}
                    </Form.Select>
                </Col>
                <Col xs={6} style={{ textAlign: 'end' }}>
                    <Button variant="primary" onClick={() => setModal({ isOpen: true, type: 'add' })}>
                        Add Record
                    </Button>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col>
                    <Modal show={modal.isOpen} onHide={handleClose} backdrop='static' keyboard="False">
                        {modal.type === 'add' && <CreateRecord closeHandler={handleClose} nationalities={nationalities} />}
                        {modal.type === 'edit' && <UpdateRecord closeHandler={handleClose} item={selectedRecord} nationalities={nationalities} />}
                    </Modal>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Nationality</th>
                                <th>Date OF Birth</th>
                                <th>Status</th>
                                <th>actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentList && studentList.length > 0 ?
                                studentList.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.nationality}</td>
                                            <td>{item.dob}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                <>
                                                    <a href="#" onClick={(e) => updateRecord(e, item)}>View</a>
                                                </>
                                                {(currentProfile === 'Registrar') && (
                                                    <>
                                                        / <a href="#" onClick={(e) => updateRecord(e, item)}>Edit</a>
                                                    </>)}
                                                {(currentProfile === 'Registrar' && item.status === 'pending') && (
                                                    <>
                                                        / <a href="#" onClick={(e) => approveRecord(e, item)}>Approve</a>
                                                    </>)}
                                            </td>
                                        </tr>
                                    )
                                }) : (
                                    <tr>
                                        <td colSpan={6}>No records</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    )
}

export default StudentList