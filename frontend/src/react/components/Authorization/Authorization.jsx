import { ModalForm } from "../Modal/components/ModalForm/ModalForm";
import { ModalFormField } from "../Modal/components/ModalFormField/ModalFormField";
import { withModalForm } from "../../hoc";

const ModalFormContainer = withModalForm(ModalForm);

export const Authorization = () => {
	const handleSubmit = () => {};
	const onSubmit = () => {};

	return (
		<ModalFormContainer buttonText="Войти" onSubmit={handleSubmit(onSubmit)}>
			<ModalFormField type="text" placeholder="E-mail" autoComplete="on" error={""} />
			<ModalFormField type="password" placeholder="Пароль" autoComplete="on" error={""} />
		</ModalFormContainer>
	);
};
