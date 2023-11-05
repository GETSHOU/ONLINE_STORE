import { Container } from "../components";

export const WithContainer = Component => {
	return props => {
		return (
			<Container>
				<Component {...props} />
			</Container>
		);
	};
};
