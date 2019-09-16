import { combineReducers} from 'redux';
import setipreducer from './setip.js'
import iplist from './iplist'

export default combineReducers({
    setipreducer,
    iplist
});