import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useResetAuthForm } from "../../hooks";
import {
	registrationUserAsync,
	removeRegistrationUserFormError,
} from "../../store/actions";
import {
	modalTypeSelector,
	userErrorSelector,
	formErrorRegSelector,
} from "../../store/selectors";
import { regFormSchema } from "../../scheme";
import { Form } from "../Form/Form";
import { FormGroup } from "../Form/components/FormGroup/FormGroup";

export const Registration = () => {
	const formError = useSelector(formErrorRegSelector);
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
			name: "",
			password: "",
			passcheck: "",
		},
		resolver: yupResolver(regFormSchema),
		mode: "all",
	});

	useResetAuthForm(reset, currentModal);

	const emailErrorMessage = errors.email?.message;
	const nameErrorMessage = errors.name?.message;
	const passwordErrorMessage = errors.password?.message;
	const passcheckErrorMessage = errors.passcheck?.message;

	const checkFieldErrors =
		!!formError ||
		!!emailErrorMessage ||
		!!nameErrorMessage ||
		!!passwordErrorMessage ||
		!!passcheckErrorMessage;

	const onSubmit = ({ email, name, password }) =>
		dispatch(registrationUserAsync({ email, name, password }));

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
							dispatch(removeRegistrationUserFormError());
						}
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
				{...register("name", {
					onChange: () => {
						if (formError) {
							dispatch(removeRegistrationUserFormError());
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
							dispatch(removeRegistrationUserFormError());
						}
					},
				})}
			/>
			<FormGroup
				type="password"
				name="passcheck"
				labelname="Повторите пароль"
				fieldError={passcheckErrorMessage}
				placeholder=""
				autoComplete="on"
				{...register("passcheck", {
					onChange: () => {
						if (formError) {
							dispatch(removeRegistrationUserFormError());
						}
					},
				})}
			/>
			<FormGroup
				buttonText="Регистрация"
				isFormButton={true}
				checkFieldErrors={checkFieldErrors}
			/>
		</Form>
	);
};
