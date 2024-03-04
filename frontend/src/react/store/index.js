import {
	legacy_createStore as createStore,
	combineReducers,
	applyMiddleware,
	compose,
} from "redux";
import thunk from "redux-thunk";
import {
	appReducer,
	authReducer,
	userReducer,
	usersReducer,
	rolesReducer,
	productReducer,
	productsReducer,
	categoriesReducer,
	subcategoriesReducer,
} from "./reducers";

const reducer = combineReducers({
	app: appReducer,
	auth: authReducer,
	user: userReducer,
	users: usersReducer,
	roles: rolesReducer,
	product: productReducer,
	products: productsReducer,
	categories: categoriesReducer,
	subcategories: subcategoriesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

store.subscribe(() => {
	localStorage.setItem("basket", JSON.stringify(store.getState().user.userData.basket));
});
