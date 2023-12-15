import * as yup from "yup";

export const categoryFormSchema = yup.object().shape({
	title: yup
		.string()
		.required("Обязательное поле")
		.matches(/^[a-zA-Zа-яА-Я\s]+$/gi, "Допускаются только буквы")
		.min(2, "Должно быть минимум 2 символа")
		.strict(true)
		.trim("Пробелы до/после имени не допускаются"),
});
