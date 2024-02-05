import {
	legacy_createStore as createStore,
	combineReducers,
	applyMiddleware,
	compose,
} from "redux";
import thunk from "redux-thunk";
import {
	appReducer,
	userReducer,
	productReducer,
	categoryReducer,
	productsReducer,
	categoriesReducer,
	subcategoryReducer,
	subcategoriesReducer,
} from "./reducers";

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	product: productReducer,
	products: productsReducer,
	category: categoryReducer,
	categories: categoriesReducer,
	subcategory: subcategoryReducer,
	subcategories: subcategoriesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

store.subscribe(() => {
	localStorage.setItem("basket", JSON.stringify(store.getState().user.userData.basket));
});
