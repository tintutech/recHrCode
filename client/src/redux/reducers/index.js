import { combineReducers } from 'redux';
import students from './students';
import profile from './profile';

export default combineReducers({
    students,
    profile,
});
