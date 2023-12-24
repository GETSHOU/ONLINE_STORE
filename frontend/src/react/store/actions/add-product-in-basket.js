import { ACTION_TYPE } from "../../../constants";

export const addProductInBasket = product => ({
	type: ACTION_TYPE.ADD_PRODUCT_IN_BASKET,
	payload: product,
});
