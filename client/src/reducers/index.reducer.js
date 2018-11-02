
import { combineReducers } from 'redux';
import { reducer as notifications } from 'react-notification-system-redux';

import { userReducer } from './user';
import { spaceReducer } from './space';



export default combineReducers({
	users: userReducer,
	spaces: spaceReducer,
	notifications,
});