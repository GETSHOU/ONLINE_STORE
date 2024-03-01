import { ROLES, ACTION_TYPE } from "../../../constants";
import { getBasketFromLocalStorage } from "../../../utils";

const initialUserState = {
	userData: {
		id: null,
		name: "Гость",
		email: null,
		roleId: ROLES.GUEST,
		basket: getBasketFromLocalStorage() || [],
		orders: [],
	},
	serverMessages: {
		user: {
			userError: null,
		},
		orders: {
			getOrdersError: null,
			getOrdersSuccess: null,
			createOrderError: null,
			createOrderSuccess: null,
		},
	},
	flags: {
		isLoggedIn: false,
		ordersLoadingStatus: false,
	},
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
				flags: {
					...state.flags,
					isLoggedIn: !state.flags.isLoggedIn,
				},
			};
		case ACTION_TYPE.LOGOUT:
			return {
				...initialUserState,
				userData: {
					...initialUserState.userData,
					basket: action.payload || [],
				},
			};
		case ACTION_TYPE.LOGOUT_ERROR:
			return {
				...state,
				serverMessages: {
					...state.serverMessages,
					user: {
						...state.serverMessages.user,
						userError: action.payload,
					},
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
		case ACTION_TYPE.CREATE_ORDER_SUCCESS:
			return {
				...state,
				userData: {
					...state.userData,
					basket: [],
					orders: [...state.userData.orders, action.payload],
				},
				serverMessages: {
					...state.serverMessages,
					orders: {
						...state.serverMessages.orders,
						createOrderError: initialUserState.serverMessages.orders.createOrderError,
						createOrderSuccess: "Ваш заказ создан!",
					},
				},
			};
		case ACTION_TYPE.CREATE_ORDER_ERROR:
			return {
				...state,
				serverMessages: {
					...state.serverMessages,
					orders: {
						...state.serverMessages.orders,
						createOrderError: action.payload.error,
						createOrderSuccess: initialUserState.serverMessages.orders.createOrderSuccess,
					},
				},
			};
		case ACTION_TYPE.CLEAR_CREATE_ORDER_SERVER_MESSAGES:
			return {
				...state,
				serverMessages: {
					...state.serverMessages,
					orders: {
						...state.serverMessages.orders,
						createOrderError: initialUserState.serverMessages.orders.createOrderError,
						createOrderSuccess: initialUserState.serverMessages.orders.createOrderSuccess,
					},
				},
			};
		case ACTION_TYPE.SET_ORDERS_SUCCESS:
			return {
				...state,
				userData: {
					...state.userData,
					orders: action.payload,
				},
				serverMessages: {
					...state.serverMessages,
					orders: {
						...state.serverMessages.orders,
						getOrdersError: initialUserState.serverMessages.orders.createOrderError,
					},
				},
			};
		case ACTION_TYPE.SET_ORDERS_LOADING_STATUS:
			return {
				...state,
				flags: {
					...state.flags,
					ordersLoadingStatus: action.payload,
				},
			};
		case ACTION_TYPE.SET_ORDERS_ERROR:
			return {
				...state,
				serverMessages: {
					...state.serverMessages,
					orders: {
						...state.serverMessages.orders,
						getOrdersError: action.payload.error,
					},
				},
			};
		default:
			return state;
	}
};
