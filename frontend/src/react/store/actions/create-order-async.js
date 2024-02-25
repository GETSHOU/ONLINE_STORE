import { ACTION_TYPE } from "../../../constants";
import { basketService } from "../../../services";

export const createOrderAsync = (userId, order) => dispatch =>
	basketService
		.create(userId, order)
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch({
				type: ACTION_TYPE.CREATE_ORDER_SUCCESS,
				payload: res.data,
			});
		})
		.catch(e => {
			dispatch({
				type: ACTION_TYPE.CREATE_ORDER_ERROR,
				payload: { error: e.message },
			});
		});
