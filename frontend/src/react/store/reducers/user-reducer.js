import { ROLES, ACTION_TYPE } from "../../../constants";

const currentBasketDataJSON = localStorage.getItem("basket");
const basketFromStorage = JSON.parse(currentBasketDataJSON);

const initialUserState = {
	userData: {
		id: null,
		name: "Гость",
		email: null,
		roleId: ROLES.GUEST,
		basket: basketFromStorage || [],
		orders: [],
	},
	isLoggedIn: false,
};

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				userData: {
					...state.userData,
					...action.payload,
				},
				isLoggedIn: !state.isLoggedIn,
			};
		case ACTION_TYPE.LOGOUT:
			return {
				...initialUserState,
				userData: {
					...initialUserState.userData,
					basket: [...action.payload],
				},
			};
		case ACTION_TYPE.ADD_PRODUCT_IN_BASKET:
			return {
				...state,
				userData: {
					...state.userData,
					basket: [...state.userData.basket, action.payload],
				},
			};
		case ACTION_TYPE.DELETE_PRODUCT_FROM_BASKET:
			return {
				...state,
				userData: {
					...state.userData,
					basket: state.userData.basket.filter(
						({ product }) => product.id !== action.payload,
					),
				},
			};
		case ACTION_TYPE.CHANGE_NUMBER_OF_PRODUCTS:
			return {
				...state,
				userData: {
					...state.userData,
					basket: state.userData.basket.map(item => {
						if (item.product.id === action.payload.productId) {
							return {
								...item,
								productCount: action.payload.productCount || item.productCount,
							};
						}
						return item;
					}),
				},
			};
		default:
			return state;
	}
};
