import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/actions";
import { userIsLoggedInSelector } from "../../store/selectors";

export const AuthProvider = ({ children }) => {
	const dispatch = useDispatch();
	const userIsLoggedIn = useSelector(userIsLoggedInSelector);

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem("userData");

		if (!currentUserDataJSON) {
			return;
		} else {
			const currentUserData = JSON.parse(currentUserDataJSON);

			if (!userIsLoggedIn) {
				dispatch(setUser(currentUserData));
			}
		}
	}, [dispatch, userIsLoggedIn]);

	return <>{children}</>;
};
