import { ACTION_TYPE } from "../../../constants";
import { categoriesService } from "../../../services";
import { closeModal } from "./close-modal";

export const updateCategoryAsync = (categoryId, updatedCategorytitle) => dispatch =>
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

			dispatch(closeModal());
		})
		.catch(e => {
			dispatch({ type: ACTION_TYPE.UPDATE_CATEGORY_ERROR, payload: e.message });
		});
