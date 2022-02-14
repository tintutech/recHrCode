import {
    UPDATE_PROFILE
} from './../actions/types';

const initialState = {
    currentProfile: 'Student',
};

const Profile = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_PROFILE:
            return {
                ...state,
                currentProfile: payload
            };

        default:
            return state;
    }
}

export default Profile;