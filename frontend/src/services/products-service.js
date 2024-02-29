import { request } from "../utils";
import { BASE_URL } from "./http-service";
import { SORTING_TYPE } from "../constants";

export const productsService = {
	getOne: id => request(`${BASE_URL}products/${id}`),
	create: (subcategoryId, product) =>
		request(`${BASE_URL}subcategories/${subcategoryId}/products/create`, "POST", product),
	update: (productId, updatedProduct) =>
		request(`${BASE_URL}products/${productId}/update`, "PATCH", updatedProduct),
	delete: productId => request(`${BASE_URL}products/${productId}/delete`, "DELETE"),
	getSortedProducts: (subcategoryId, sortType) =>
		request(
			`${BASE_URL}subcategories/${subcategoryId}/products/${
				sortType === SORTING_TYPE.BY_ASC
					? "sort_asc"
					: sortType === SORTING_TYPE.BY_DESC && "sort_desc"
			}?_sort=price`,
		),
	getSortedAllProducts: sortType =>
		request(
			`${BASE_URL}${
				sortType === SORTING_TYPE.BY_ASC
					? "sort_asc"
					: sortType === SORTING_TYPE.BY_DESC && "sort_desc"
			}/products?_sort=price`,
		),
	getAllFromSubcategory: id => request(`${BASE_URL}subcategories/${id}/products`),
	getFoundedProducts: (searchQuery, page, limit) =>
		request(`${BASE_URL}products?search=${searchQuery}&page=${page}&limit=${limit}`),
};
