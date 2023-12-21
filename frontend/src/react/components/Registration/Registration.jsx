import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useResetAuthForm } from "../../hooks";
import { closeModal, setUser } from "../../store/actions";
import { modalTypeSelector } from "../../store/selectors";
import { regFormSchema } from "../../scheme";
import { request } from "../../../utils";
import { SESSION_STORAGE_NAMES } from "../../../constants";
import { Form } from "../Form/Form";
import { FormGroup } from "../Form/components/FormGroup/FormGroup";

export const Registration = () => {
	const [showErrorForm, setShowErrorForm] = useState(false);
	const [serverErrorForm, setServerErrorForm] = useState(null);

	const dispatch = useDispatch();
	const currentModal = useSelector(modalTypeSelector);

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			name: "",
			password: "",
			passcheck: "",
		},
		resolver: yupResolver(regFormSchema),
		mode: "all",
	});

	useResetAuthForm(reset, currentModal);

	const onSubmit = ({ email, name, password }) => {
		request("/api/register", "POST", { email, name, password }).then(
			({ error, user }) => {
				if (error) {
					setServerErrorForm(`Ошибка запроса: ${error}`);
					setShowErrorForm(true);
					return;
				}

				dispatch(setUser(user));

				sessionStorage.setItem(SESSION_STORAGE_NAMES.USER_DATA, JSON.stringify(user));

				dispatch(closeModal());
			},
		);
	};

	const emailErrorMessage = errors.email?.message;
	const nameErrorMessage = errors.name?.message;
	const passwordErrorMessage = errors.password?.message;
	const passcheckErrorMessage = errors.passcheck?.message;

	const checkFieldErrors =
		!!serverErrorForm ||
		!!emailErrorMessage ||
		!!nameErrorMessage ||
		!!passwordErrorMessage ||
		!!passcheckErrorMessage;

	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			showErrorForm={showErrorForm}
			serverErrorForm={serverErrorForm}
		>
			<FormGroup
				type="text"
				name="email"
				labelname="Почта"
				fieldError={emailErrorMessage}
				placeholder=""
				autoComplete="on"
				{...register("email", {
					onChange: () => {
						setServerErrorForm(null);
						setShowErrorForm(false);
					},
				})}
			/>
			<FormGroup
				type="text"
				name="name"
				labelname="Имя"
				fieldError={nameErrorMessage}
				placeholder=""
				autoComplete="on"
				{...register("name")}
			/>
			<FormGroup
				type="password"
				name="password"
				labelname="Пароль"
				fieldError={passwordErrorMessage}
				placeholder=""
				autoComplete="on"
				{...register("password")}
			/>
			<FormGroup
				type="password"
				name="passcheck"
				labelname="Повторите пароль"
				fieldError={passcheckErrorMessage}
				placeholder=""
				autoComplete="on"
				{...register("passcheck")}
			/>
			<FormGroup
				buttonText="Регистрация"
				isFormButton={true}
				checkFieldErrors={checkFieldErrors}
			/>
		</Form>
	);
};
