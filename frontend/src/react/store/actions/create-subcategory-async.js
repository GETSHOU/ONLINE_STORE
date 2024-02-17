import { ACTION_TYPE } from "../../../constants";
import { subcategoriesService } from "../../../services";

export const createSubcategoryAsync = (categoryId, subcategory) => dispatch => {
	subcategoriesService
		.create(categoryId, subcategory)
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch({
				type: ACTION_TYPE.CREATE_SUBCATEGORY,
				payload: res.data,
			});
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE.CREATE_SUBCATEGORY_ERROR, payload: e.message });
		});
};
