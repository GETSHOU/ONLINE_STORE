import { ACTION_TYPE } from "../../../constants";

const initialProductState = {
	publicId: "",
	id: "",
	title: "",
	vendor: "",
	vendorCode: "",
	specs: "",
	price: "",
	previewImageUrl: "",
	comments: [],
	isLoading: false,
};

export const productReducer = (state = initialProductState, action) => {
	switch (action.type) {
		case ACTION_TYPE.CREATE_PRODUCT:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.UPDATE_PRODUCT:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.DELETE_PRODUCT:
			return initialProductState;
		case ACTION_TYPE.CREATE_COMMENT:
			return {
				...state,
				comments: [...state.comments, action.payload],
			};
		case ACTION_TYPE.DELETE_COMMENT:
			return {
				...state,
				comments: state.comments.filter(comment => comment.id !== action.payload),
			};
		case ACTION_TYPE.SET_PRODUCT:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};
