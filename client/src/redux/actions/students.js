
import axios from "axios";

import {
    GET_STUDENTLIST,
    ADD_STUDENT,
    UPDATE_STUDENT
} from './../actions/types';

const BASE_URL = "http://localhost:4000/api/";
const GET_STUDENT_LIST = BASE_URL + "list/";
const ADD_STUDENTLIST = BASE_URL + "add/";
const APPROVE_STUDENT = BASE_URL + "approve/";
const UPDATE_STUDENTLIST = BASE_URL + "update/";

export function fetchStudentList() {
    return async function (dispatch) {
        const response = await axios.get(`${GET_STUDENT_LIST}`);
        const response_1 = response;
        if (response_1.data != null) {
            dispatch({ type: GET_STUDENTLIST, payload: response_1.data });
        }
        else {
        }
    }
}

export function addStudent(payload) {
    return async function (dispatch) {
        const response = await axios.post(`${ADD_STUDENTLIST}`, payload);
        const response_1 = response;
        if (response_1.data != null) {
            dispatch({ type: ADD_STUDENT, payload: response_1.data });
        }
        else {
        }
    }
}

export function updateStudent(payload) {
    return async function (dispatch) {
        const response = await axios.post(`${UPDATE_STUDENTLIST}`, payload);
        const response_1 = response;
        if (response_1.data != null) {
            dispatch({ type: UPDATE_STUDENT, payload: response_1.data });
        }
        else {
        }
    }
}

export function approveStudent(item) {
    return async function (dispatch) {
        const payload = { studentId: item._id }
        const response = await axios.post(`${APPROVE_STUDENT}`, payload);
        const response_1 = response;
        if (response_1.data != null) {
            dispatch({ type: UPDATE_STUDENT, payload: response_1.data });
        }
        else {
        }
    }
}