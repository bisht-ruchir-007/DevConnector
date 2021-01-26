import { SET_ALERT, REMOVE_ALERT } from './types';
import uuid from 'uuid';
export const setAlert = (msg, alertType) => (dispatch) => {
	const id = uuid.v4();
	const newAlert = {
		id,
		msg,
		alertType
	};

	dispatch({
		type: SET_ALERT,
		payload: newAlert
	});
};
