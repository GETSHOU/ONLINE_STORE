import { ACTION_TYPE } from "../../../constants";
import { categoriesService } from "../../../services";

export const deleteCategoryAsync = categoryId => dispatch =>
	categoriesService
		.delete(categoryId)
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch({
				type: ACTION_TYPE.DELETE_CATEGORY,
				payload: categoryId,
			});
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE.DELETE_CATEGORY_ERROR, payload: e.message });
		});
