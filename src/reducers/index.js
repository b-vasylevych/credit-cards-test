import { combineReducers } from 'redux';

import cardReducer from './cardSlice';


export default combineReducers({
    card: cardReducer,
})
