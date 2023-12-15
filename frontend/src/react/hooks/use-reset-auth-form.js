import { useEffect } from "react";
import { useStore } from "react-redux";
import { MODAL_TYPES } from "../../constants";

export const useResetAuthForm = (reset, currentModal) => {
	const store = useStore();

	useEffect(() => {
		let userIsLoggedInState = store.getState().user.isLoggedIn;

		if (
			currentModal === MODAL_TYPES.AUTHORIZATION ||
			currentModal === MODAL_TYPES.REGISTRATION
		) {
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
