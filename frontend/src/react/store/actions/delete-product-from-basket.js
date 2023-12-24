import { ACTION_TYPE } from "../../../constants";

export const deleteProductFromBasket = productId => ({
	type: ACTION_TYPE.DELETE_PRODUCT_FROM_BASKET,
	payload: productId,
});
