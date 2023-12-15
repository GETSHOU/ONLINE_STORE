import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/actions";
import { currentModalSelector } from "../../store/selectors";
import { MODAL_TYPES } from "../../../constants";
import { WithModal, WithModalAuth } from "../../hoc";
import { Authorization } from "../Authorization/Authorization";
import { Registration } from "../Registration/Registration";

const AuthorizationModal = WithModal(WithModalAuth(Authorization));
const RegistrationModal = WithModal(WithModalAuth(Registration));

export const ConditionalRenderingModal = () => {
	const dispatch = useDispatch();
	const currentModal = useSelector(currentModalSelector);

	const handleOpenAuthModal = () => dispatch(openModal(MODAL_TYPES.AUTHORIZATION));
	const handleOpenRegModal = () => dispatch(openModal(MODAL_TYPES.REGISTRATION));

	return (
		<>
			{currentModal === MODAL_TYPES.AUTHORIZATION ? (
				<AuthorizationModal
					modalTitle="Авторизация"
					buttonText="Регистрация"
					toggleModal={handleOpenRegModal}
				/>
			) : currentModal === MODAL_TYPES.REGISTRATION ? (
				<RegistrationModal
					modalTitle="Регистрация"
					buttonText="У вас уже есть аккаунт?"
					toggleModal={handleOpenAuthModal}
				/>
			) : null}
		</>
	);
};
