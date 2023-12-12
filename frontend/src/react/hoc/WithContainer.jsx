import { Container } from "../components";

export const WithContainer = Component => {
	return props => {
		return (
			<Container isAllowedRoles={props.isAllowedRoles}>
				<Component {...props} />
			</Container>
		);
	};
};
