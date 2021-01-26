import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
const initialState = [];

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SET_ALERT:
			const temp = state.filter((alert) => alert.msg === payload.msg);
			if (temp.length === 0) {
				return [ ...state, payload ];
			} else {
				return [ ...state ];
			}

		case REMOVE_ALERT:
			return state.filter((alert) => alert.id !== payload);
		default:
			return state;
	}
}
