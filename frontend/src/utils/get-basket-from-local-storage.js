export const getBasketFromLocalStorage = () => {
	const currentBasketDataJSON = localStorage.getItem("basket");
	const basketFromStorage = JSON.parse(currentBasketDataJSON);

	return basketFromStorage;
};
