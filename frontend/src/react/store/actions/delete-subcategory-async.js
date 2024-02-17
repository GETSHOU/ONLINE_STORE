import { ACTION_TYPE } from "../../../constants";
import { subcategoriesService } from "../../../services";

export const deleteSubcategoryAsync = subcategoryId => dispatch => {
	subcategoriesService
		.delete(subcategoryId)
		.then(res => {
			if (res.error) {
				throw new Error(res.error);
			}

			dispatch({
				type: ACTION_TYPE.DELETE_SUBCATEGORY,
				payload: subcategoryId,
			});
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE.DELETE_SUBCATEGORY_ERROR, payload: e.message });
		});
};
