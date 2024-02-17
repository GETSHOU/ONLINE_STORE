import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useResetAuthForm } from "../../hooks";
import {
	authorizationUserAsync,
	removeAuthorizationUserFormError,
} from "../../store/actions";
import {
	modalTypeSelector,
	userErrorSelector,
	formErrorAuthSelector,
} from "../../store/selectors";
import { authFormSchema } from "../../scheme";
import { Form } from "../Form/Form";
import { FormGroup } from "../Form/components/FormGroup/FormGroup";

export const Authorization = () => {
	const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState(false);

	const formError = useSelector(formErrorAuthSelector);
	const serverError = useSelector(userErrorSelector);
	const currentModal = useSelector(modalTypeSelector);

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

	useResetAuthForm(reset, currentModal);

	const emailErrorMessage = errors.email?.message;
	const passwordErrorMessage = errors.password?.message;

	const checkFieldErrors = !!formError || !!emailErrorMessage || !!passwordErrorMessage;

	const onSubmit = ({ email, password }) => {
		setSubmitButtonIsDisabled(true);

		dispatch(authorizationUserAsync({ email, password })).finally(() =>
			setSubmitButtonIsDisabled(false),
		);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)} formError={formError}>
			<FormGroup
				type="text"
				name="email"
				labelname="Почта"
				fieldError={emailErrorMessage}
				placeholder=""
				autoComplete="on"
				{...register("email", {
					onChange: () => {
						if (formError) {
							dispatch(removeAuthorizationUserFormError());
						}
					},
				})}
			/>
			<FormGroup
				type="password"
				name="password"
				labelname="Пароль"
				fieldError={passwordErrorMessage}
				placeholder=""
				autoComplete="on"
				{...register("password", {
					onChange: () => {
						if (formError) {
							dispatch(removeAuthorizationUserFormError());
						}
					},
				})}
			/>
			<FormGroup
				buttonText="Войти"
				isFormButton={true}
				checkFieldErrors={checkFieldErrors}
				submitButtonIsDisabled={submitButtonIsDisabled}
			/>
		</Form>
	);
};
