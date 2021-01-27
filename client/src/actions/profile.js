import axios from 'axios';
import { setAlert } from './alert';

import { PROFILE_ERROR, GET_PROFILE } from './types';

// Get the current user profile
export const getCurrentUserProfile = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/profile/me');

		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};
