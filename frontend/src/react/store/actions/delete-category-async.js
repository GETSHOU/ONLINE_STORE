import { ACTION_TYPE, ACTION_TYPE_ERORRS } from "../../../constants";
import { categoriesService } from "../../../services";
import { closeModal } from "./close-modal";

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

			dispatch(closeModal());
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE_ERORRS.DELETE_CATEGORY_ERROR, payload: e.message });
		});
