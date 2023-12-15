import { ModalAuth } from "../components";

export const WithModalAuth = Component => {
	return props => {
		return (
			<ModalAuth {...props}>
				<Component {...props} />
			</ModalAuth>
		);
	};
};
