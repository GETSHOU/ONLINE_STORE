import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./react/store";
import { Main, Catalog, Users } from "./react/pages";
import "./styles/_index.scss";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Cannot find root element with that id");

const root = ReactDOM.createRoot(rootEl);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<Routes>
					<Route path="/" element={<Main />}>
						<Route path="catalog" element={<Catalog />} />
						<Route path="users" element={<Users />} />
					</Route>
				</Routes>
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
);
