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
	usersReducer,
	categoriesReducer,
	subcategoriesReducer,
} from "./reducers";

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	users: usersReducer,
	catalog: categoriesReducer,
	subcatalog: subcategoriesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
