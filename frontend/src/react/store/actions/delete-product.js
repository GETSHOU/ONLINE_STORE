import { ACTION_TYPE } from "../../../constants";

export const deleteProduct = productId => ({
	type: ACTION_TYPE.DELETE_PRODUCT,
	payload: productId,
});
