import { combineReducers } from 'redux';
import contract from './contract.js';
import user from './user.js';


export default combineReducers({ contract, user });