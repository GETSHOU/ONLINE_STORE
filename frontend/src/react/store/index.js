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
	subcategoryReducer,
} from "./reducers";

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	product: productReducer,
	category: categoryReducer,
	subcategory: subcategoryReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
