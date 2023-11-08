import { createPortal } from "react-dom";
import { Modal } from "../components";

export const withModal = (Component, modalTitle) => {
	const rootEl = document.body;

	return props => {
		return createPortal(
			<Modal modalTitle={modalTitle} {...props}>
				<Component {...props} />
			</Modal>,
			rootEl,
		);
	};
};
