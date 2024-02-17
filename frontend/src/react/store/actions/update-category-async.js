import { ACTION_TYPE } from "../../../constants";
import { categoriesService } from "../../../services";

export const updateCategoryAsync = (categoryId, updatedCategorytitle) => dispatch => {
	categoriesService
		.update(categoryId, updatedCategorytitle)
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch({
				type: ACTION_TYPE.UPDATE_CATEGORY,
				payload: { id: categoryId, data: res.data },
			});
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE.UPDATE_CATEGORY_ERROR, payload: e.message });
		});
};
