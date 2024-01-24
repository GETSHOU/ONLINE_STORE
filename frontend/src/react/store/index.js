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
	catalogReducer,
	productReducer,
	categoryReducer,
	productsReducer,
	subcategoryReducer,
	subcategoriesReducer,
} from "./reducers";

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	product: productReducer,
	catalog: catalogReducer,
	category: categoryReducer,
	products: productsReducer,
	subcategory: subcategoryReducer,
	subcategories: subcategoriesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

store.subscribe(() => {
	localStorage.setItem("basket", JSON.stringify(store.getState().user.userData.basket));
});
