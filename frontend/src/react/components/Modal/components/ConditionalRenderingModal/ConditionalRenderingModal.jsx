import { useDispatch, useSelector } from "react-redux";
import { openModalForm } from "../../../../store/actions";
import { currentModalSelector } from "../../../../store/selectors";
import { MODAL_FORM } from "../../../../../constants";
import { withModal } from "../../../../hoc";
import { Authorization } from "../../../Authorization/Authorization";
import { Registration } from "../../../Registration/Registration";

const AuthorizationModal = withModal(Authorization);
const RegistrationModal = withModal(Registration);

export const ConditionalRenderingModal = () => {
	const dispatch = useDispatch();
	const currentModal = useSelector(currentModalSelector);

	const openAuthModal = () => dispatch(openModalForm(MODAL_FORM.AUTH));
	const openRegistrationModal = () => dispatch(openModalForm(MODAL_FORM.REG));

	return (
		<>
			{currentModal === MODAL_FORM.AUTH ? (
				<AuthorizationModal
					modalTitle="Авторизация"
					buttonText="Регистрация"
					toggleModal={openRegistrationModal}
				/>
			) : (
				<RegistrationModal
					modalTitle="Регистрация"
					buttonText="У вас уже есть аккаунт?"
					toggleModal={openAuthModal}
				/>
			)}
		</>
	);
};
