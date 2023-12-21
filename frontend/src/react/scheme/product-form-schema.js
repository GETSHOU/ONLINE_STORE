import * as yup from "yup";

export const productFormSchema = yup.object().shape({
	title: yup
		.string()
		.required("Обязательное поле")
		// .min(2, "Должно быть минимум 2 символа")
		.strict(true)
		.trim("Пробелы до/после названия не допускаются"),
	previewImageUrl: yup
		.string()
		.required("Обязательное поле")
		// .matches(
		// 	/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
		// 	"Некорректная ссылка",
		// )
		// .min(2, "Должно быть минимум 2 символа")
		.strict(true)
		.trim("Пробелы до/после названия не допускаются"),
	vendor: yup
		.string()
		.required("Обязательное поле")
		// .min(2, "Должно быть минимум 2 символа")
		.strict(true)
		.trim("Пробелы до/после названия не допускаются"),
	vendorCode: yup
		.string()
		.required("Обязательное поле")
		// .min(2, "Должно быть минимум 2 символа")
		.strict(true)
		.trim("Пробелы до/после названия не допускаются"),
	specs: yup
		.string()
		.required("Обязательное поле")
		// .min(2, "Должно быть минимум 2 символа")
		.strict(true)
		.trim("Пробелы до/после названия не допускаются"),
	price: yup
		.string()
		.required("Обязательное поле")
		// .matches(/^\d+$/, "Допускаются только цифры")
		// .min(2, "Должно быть минимум 2 символа")
		.strict(true)
		.trim("Пробелы до/после названия не допускаются"),
});
