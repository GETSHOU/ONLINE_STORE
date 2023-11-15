import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./react/store";
import { App } from "./App";
import "./styles/_index.scss";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Cannot find root element with that id");

const root = ReactDOM.createRoot(rootEl);

root.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
);
