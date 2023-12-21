import { useDispatch } from "react-redux";
import { RiEditBoxFill } from "react-icons/ri";
import { openModal } from "../../../../store/actions";
import { MODAL_TYPES } from "../../../../../constants";
import { ActionButton } from "../../../../components";
import styles from "./ProductsTableRow.module.scss";

export const ProductsTableRow = ({ id, title, value, productField }) => {
	const dispatch = useDispatch();

	const handleOpenEditModal = (id, value) => {
		dispatch(
			openModal({
				type: MODAL_TYPES.FORM_UPDATE,
				data: {
					id,
					field: productField,
					valueToUpdate: value,
					newValueToUpdate: value,
				},
			}),
		);
	};

	return (
		<div className={styles.tableRow}>
			<div className={`${styles.tableRowCell} ${styles.tableRowTitle}`}>{title}:</div>
			<div className={styles.tableRowCell}>{value}</div>
			<div className={`${styles.tableRowCell} ${styles.tableRowActions}`}>
				<ActionButton
					icon={<RiEditBoxFill className="icon iconEdit" />}
					clickFunction={() => handleOpenEditModal(id, value, productField)}
				/>
			</div>
		</div>
	);
};
