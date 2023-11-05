import { ModalForm } from "../Modal/components/ModalForm/ModalForm";
import { ModalFormField } from "../Modal/components/ModalFormField/ModalFormField";
import { withModalForm } from "../../hoc";

const ModalFormContainer = withModalForm(ModalForm);

export const Registration = () => {
	const handleSubmit = () => {};
	const onSubmit = () => {};

	return (
		<ModalFormContainer buttonText="Регистрация" onSubmit={handleSubmit(onSubmit)}>
			<ModalFormField type="text" placeholder="E-mail" autoComplete="on" error={""} />
			<ModalFormField type="text" placeholder="Имя" autoComplete="on" error={""} />
			<ModalFormField type="text" placeholder="Телефон" autoComplete="on" error={""} />
			<ModalFormField type="password" placeholder="Пароль" autoComplete="on" error={""} />
			<ModalFormField
				type="password"
				placeholder="Повторите пароль"
				autoComplete="on"
				error={""}
			/>
		</ModalFormContainer>
	);
};
