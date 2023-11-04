import { Container } from "../components";

export const WithContainer = Component => {
	return function ContainerHOC(props) {
		return (
			<Container>
				<Component {...props} />
			</Container>
		);
	};
};
