import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useResetForm } from "../../hooks";
import { closeModalForm, setUserAction } from "../../store/actions";
import { userRoleSelector } from "../../store/selectors";
import { regFormSchema } from "../../scheme";
import { checkAccess, request } from "../../../utils";
import { ROLES } from "../../../constants";
import { ModalForm } from "../Modal/components/ModalForm/ModalForm";
import { ModalFormField } from "../Modal/components/ModalFormField/ModalFormField";

export const Registration = () => {
	const [serverError, setServerError] = useState(null);
	const [showError, setShowError] = useState(false);

	const dispatch = useDispatch();
	const roleId = useSelector(userRoleSelector);

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

	useResetForm(reset);

	const closeModal = () => dispatch(closeModalForm());

	const onSubmit = ({ email, name, password }) => {
		request("/register", "POST", { email, name, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				setShowError(true);
				return;
			}

			dispatch(setUserAction(user));
			sessionStorage.setItem("userData", JSON.stringify(user));

			closeModal();
		});
	};

	const emailErrorMessage = errors.email?.message;
	const nameErrorMessage = errors.name?.message;
	const passwordErrorMessage = errors.password?.message;
	const passcheckErrorMessage = errors.passcheck?.message;

	const isGuest = checkAccess([ROLES.GUEST], roleId);

	if (!isGuest) {
		return <Navigate to="/" />;
	}

	return (
		<ModalForm
			onSubmit={handleSubmit(onSubmit)}
			buttonText="Регистрация"
			showError={showError}
			serverError={serverError}
			emailErrorMessage={emailErrorMessage}
			nameErrorMessage={nameErrorMessage}
			passwordErrorMessage={passwordErrorMessage}
			passcheckErrorMessage={passcheckErrorMessage}
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
				type="text"
				name="name"
				labelname="Имя"
				placeholder=""
				autoComplete="on"
				error={nameErrorMessage}
				{...register("name")}
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
			<ModalFormField
				type="password"
				name="passcheck"
				labelname="Повторите пароль"
				placeholder=""
				autoComplete="on"
				error={passcheckErrorMessage}
				{...register("passcheck")}
			/>
		</ModalForm>
	);
};
