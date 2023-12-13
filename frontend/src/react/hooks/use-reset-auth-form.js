import { useEffect } from "react";
import { useStore } from "react-redux";
import { MODAL_FORM } from "../../constants";

export const useResetAuthForm = (reset, currentModal) => {
	const store = useStore();

	useEffect(() => {
		let userIsLoggedInState = store.getState().user.isLoggedIn;

		if (currentModal === MODAL_FORM.AUTH || currentModal === MODAL_FORM.REG) {
			return store.subscribe(() => {
				const previousUserIsLoggedInState = userIsLoggedInState;

				userIsLoggedInState = store.getState().user.isLoggedIn;

				if (userIsLoggedInState !== previousUserIsLoggedInState) {
					reset();
				}
			});
		}
	}, [reset, currentModal, store]);
};
