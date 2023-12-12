import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useResetForm } from "../../hooks";
import { closeModalForm, setUser } from "../../store/actions";
import { authFormSchema } from "../../scheme";
import { request } from "../../../utils";
import { SESSION_STORAGE_NAMES } from "../../../constants";
import { ModalForm } from "../Modal/components/ModalForm/ModalForm";
import { ModalFormField } from "../Modal/components/ModalFormField/ModalFormField";

export const Authorization = () => {
	const [serverError, setServerError] = useState(null);
	const [showError, setShowError] = useState(false);

	const dispatch = useDispatch();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: yupResolver(authFormSchema),
		mode: "all",
	});

	useResetForm(reset);

	const closeModal = () => dispatch(closeModalForm());

	const onSubmit = ({ email, password }) => {
		request("/api/login", "POST", { email, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				setShowError(true);
				return;
			}

			dispatch(setUser(user));

			sessionStorage.setItem(SESSION_STORAGE_NAMES.USER_DATA, JSON.stringify(user));

			closeModal();
		});
	};

	const emailErrorMessage = errors.email?.message;
	const passwordErrorMessage = errors.password?.message;

	return (
		<ModalForm
			onSubmit={handleSubmit(onSubmit)}
			buttonText="Войти"
			showError={showError}
			serverError={serverError}
			emailErrorMessage={emailErrorMessage}
			passwordErrorMessage={passwordErrorMessage}
		>
			<ModalFormField
				type="text"
				name="email"
				labelname="Почта"
				placeholder=""
				autoComplete="on"
				error={emailErrorMessage}
				{...register("email", {
					onChange: () => {
						setServerError(null);
						setShowError(false);
					},
				})}
			/>
			<ModalFormField
				type="password"
				name="password"
				labelname="Пароль"
				placeholder=""
				autoComplete="on"
				error={passwordErrorMessage}
				{...register("password")}
			/>
		</ModalForm>
	);
};
