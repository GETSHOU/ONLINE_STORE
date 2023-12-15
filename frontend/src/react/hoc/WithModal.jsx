import { createPortal } from "react-dom";
import { Overlay, Modal } from "../components";

export const WithModal = Component => {
	const rootEl = document.body;

	return props => {
		return createPortal(
			<Overlay>
				<Modal {...props}>
					<Component {...props} />
				</Modal>
			</Overlay>,
			rootEl,
		);
	};
};
