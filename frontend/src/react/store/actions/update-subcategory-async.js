import { ACTION_TYPE, ACTION_TYPE_ERORRS } from "../../../constants";
import { subcategoriesService } from "../../../services";
import { closeModal } from "./close-modal";

export const updateSubcategoryAsync =
	(subcategoryId, updatedSubcategorytitle) => dispatch =>
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

				dispatch(closeModal());
			})
			.catch(e => {
				dispatch({
					type: ACTION_TYPE_ERORRS.UPDATE_SUBCATEGORY_ERROR,
					payload: e.message,
				});
			});
