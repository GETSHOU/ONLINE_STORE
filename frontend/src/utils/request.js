export const request = (url, method, data) => {
	return fetch(url, {
		headers: {
			"content-type": "application/json",
		},
		method: method || "GET",
		body: data ? JSON.stringify(data) : undefined,
		credentials: "include",
	}).then(res => res.json());
};

// Использовать с cors, который применяется в папке backend в файле app.js
// раскоментировать строчку app.use(cors({ origin: `http://localhost:${devPort}`, credentials: true }));
// export const request = (path, method, data) => {
// 	const apiUrl = "http://localhost:3005";
// 	const url = new URL(path, apiUrl);

// 	return fetch(url.href, {
// 		headers: {
// 			"content-type": "application/json",
// 		},
// 		method: method || "GET",
// 		body: data ? JSON.stringify(data) : undefined,
// 		credentials: "include",
// 	}).then(res => res.json());
// };
