import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/actions";
import { SESSION_STORAGE_NAMES } from "../../../constants";

export const AuthProvider = ({ children }) => {
	const dispatch = useDispatch();
	const userIsLoggedIn = useSelector(({ user }) => user.isLoggedIn);

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem(SESSION_STORAGE_NAMES.USER_DATA);

		if (!currentUserDataJSON) return;

		const currentUserData = JSON.parse(currentUserDataJSON);

		if (!userIsLoggedIn) {
			dispatch(setUser(currentUserData));
		}
	}, [dispatch, userIsLoggedIn]);

	return <>{children}</>;
};
