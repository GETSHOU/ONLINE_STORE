import { ACTION_TYPE } from "../../../constants";

export const changeNumberOfProducts = (productId, productCount) => {
	return {
		type: ACTION_TYPE.CHANGE_NUMBER_OF_PRODUCTS,
		payload: {
			productId,
			productCount: productCount,
		},
	};
};
