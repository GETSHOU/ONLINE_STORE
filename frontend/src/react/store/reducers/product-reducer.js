import { ACTION_TYPE } from "../../../constants";

const initialProductState = {
	product: {
		id: "",
		title: "",
		specs: "",
		price: "",
		vendor: "",
		comments: [],
		publicId: "",
		vendorCode: "",
		previewImageUrl: "",
	},
	options: {
		loadingStatus: false,
	},
	error: null,
};

export const productReducer = (state = initialProductState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PRODUCT:
			return {
				...state,
				product: action.payload,
			};
		case ACTION_TYPE.SET_PRODUCT_LOADING_STATUS:
			return {
				...state,
				options: {
					...state.options,
					loadingStatus: action.payload,
				},
			};
		case ACTION_TYPE.CREATE_COMMENT:
			return {
				...state,
				product: {
					...state.product,
					comments: [...state.product.comments, action.payload],
				},
			};
		case ACTION_TYPE.UPDATE_COMMENT:
			return {
				...state,
				product: {
					...state.product,
					comments: state.product.comments.map(comment => {
						if (comment.id === action.payload.id) {
							return {
								...comment,
								...action.payload.content,
							};
						}
						return { ...comment };
					}),
				},
			};
		case ACTION_TYPE.DELETE_COMMENT:
			return {
				...state,
				product: {
					...state.product,
					comments: state.product.comments.filter(
						comment => comment.id !== action.payload,
					),
				},
			};
		case ACTION_TYPE.SET_PRODUCT_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION_TYPE.CREATE_COMMENT_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION_TYPE.UPDATE_COMMENT_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION_TYPE.DELETE_COMMENT_ERROR:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
