import {
    GET_STUDENTLIST,
    ADD_STUDENT,
    UPDATE_STUDENT,
    CURRENT_PROFILE
} from './../actions/types';

const initialState = {
    studentList: [],
    student: {},
    loading: false,
    error: {}
};

const Students = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_STUDENTLIST:
        case ADD_STUDENT:
        case UPDATE_STUDENT:
            return {
                ...state,
                studentList: payload
            };
        default:
            return state;
    }
}

export default Students;