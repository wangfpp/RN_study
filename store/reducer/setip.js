import { combineReducers} from 'redux';

const setipreducer = (state = {ip: '172.16.1.237:8887'}, action) => {
    switch (action.type) {
        case 'SetIP':
            return {ip: action.ip};
        default:
            return state;
    }
};

export default combineReducers({
    setipreducer
});