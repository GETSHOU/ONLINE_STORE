import { ACTION_TYPE } from "../../../constants";
import { categoriesService } from "../../../services";

export const createCategoryAsync = category => dispatch => {
	categoriesService
		.create(category)
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch({
				type: ACTION_TYPE.CREATE_CATEGORY,
				payload: res.data,
			});
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE.CREATE_CATEGORY_ERROR, payload: e.message });
		});
};
