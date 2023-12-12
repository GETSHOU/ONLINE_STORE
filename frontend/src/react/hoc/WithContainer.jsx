import { Container } from "../components";

export const WithContainer = Component => {
	return props => {
		return (
			<Container isAdminOrModerator={props.isAdminOrModerator}>
				<Component {...props} />
			</Container>
		);
	};
};
