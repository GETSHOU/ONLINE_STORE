import { ModalForm } from "../Modal/components/ModalForm/ModalForm";
import { ModalFormField } from "../Modal/components/ModalFormField/ModalFormField";

export const Authorization = () => {
	const handleSubmit = () => {};
	const onSubmit = () => {};

	return (
		<ModalForm buttonText="Войти" onSubmit={handleSubmit(onSubmit)}>
			<ModalFormField type="text" placeholder="E-mail" autoComplete="on" error={""} />
			<ModalFormField type="password" placeholder="Пароль" autoComplete="on" error={""} />
		</ModalForm>
	);
};
