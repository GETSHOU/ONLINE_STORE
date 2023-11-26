// // эта функция будет отвечать за то, чтобы в фетч передать правильные аргументы, а дальше распарсить запрос из json и превратить его в объект
// export const request = (url, method, data) => {
// 	console.log(url);
// 	return fetch(url, {
// 		headers: {
// 			"content-type": "application/json",
// 		},
// 		method: method || "GET",
// 		body: data ? JSON.stringify(data) : undefined,
// 		credentials: "include",
// 	}).then(res => res.json());
// };

export const request = (path, method, data) => {
	const apiUrl = "http://localhost:3005";
	const url = new URL(path, apiUrl);

	return fetch(url.href, {
		headers: {
			"content-type": "application/json",
		},
		method: method || "GET",
		body: data ? JSON.stringify(data) : undefined,
		credentials: "include",
	}).then(res => res.json());
};
