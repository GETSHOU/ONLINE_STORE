export const loadingSelector = ({ app }) => {
	console.log(app);
	return app.isLoading;
};
