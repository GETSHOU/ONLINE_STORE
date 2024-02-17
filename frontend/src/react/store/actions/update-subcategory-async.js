import { ACTION_TYPE } from "../../../constants";
import { subcategoriesService } from "../../../services";

export const updateSubcategoryAsync =
	(subcategoryId, updatedSubcategorytitle) => dispatch => {
		subcategoriesService
			.update(subcategoryId, updatedSubcategorytitle)
			.then(res => {
				if (res.error) {
					throw new Error(res.error);
				}

				dispatch({
					type: ACTION_TYPE.UPDATE_SUBCATEGORY,
					payload: { id: subcategoryId, data: res.data },
				});
			})
			.catch(e => {
				dispatch({ type: ACTION_TYPE.UPDATE_SUBCATEGORY_ERROR, payload: e.message });
			});
	};
