export const usePhoneNumberMask = (value, countryCode) => {
	const formatValue = () => {
		let formatted = "";

		if (countryCode === "+7") {
			// форматирование для России
			formatted += "+7 ";
			formatted += value.slice(0, 3) + " ";
			formatted += value.slice(3, 6) + " ";
			formatted += value.slice(6, 8) + " ";
			formatted += value.slice(8, 10);
		} else if (countryCode === "+375") {
			// форматирование для Беларуси
			formatted += "+375 ";
			formatted += value.slice(0, 2) + " ";
			formatted += value.slice(2, 5) + " ";
			formatted += value.slice(5, 7) + " ";
			formatted += value.slice(7, 9);
		}

		return formatted;
	};

	return formatValue;
};
