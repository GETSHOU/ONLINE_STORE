import { ACTION_TYPE } from "../../../constants";
import { basketService } from "../../../services";

export const getOrdersAsync = userId => dispatch => {
	dispatch({ type: ACTION_TYPE.SET_ORDERS_LOADING_STATUS, payload: true });

	return basketService
		.get(userId)
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch({
				type: ACTION_TYPE.SET_ORDERS_SUCCESS,
				payload: res.data,
			});
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE.SET_ORDERS_ERROR, payload: { error: e.message } });
		})
		.finally(() => {
			dispatch({ type: ACTION_TYPE.SET_ORDERS_LOADING_STATUS, payload: false });
		});
};
