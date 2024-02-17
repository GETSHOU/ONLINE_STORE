import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RiEditBoxFill } from "react-icons/ri";
import { TbExternalLink, TbLayoutGridRemove } from "react-icons/tb";
import { openModal } from "../../store/actions";
import { MODAL_TYPES } from "../../../constants";
import styles from "./EditCategoryCard.module.scss";

export const EditCategoryCard = ({ id, title, cardLinkText, isSubcategoriesPage }) => {
	const dispatch = useDispatch();

	const linkToProductsPage = `/subcategories-m/${id}/products-m`;
	const linkToSubcategoriesPage = `/categories-m/${id}/subcategories-m`;

	const handleOpenEditModal = (id, title) => {
		dispatch(
			openModal({
				type: MODAL_TYPES.FORM_UPDATE,
				data: {
					id,
					valueToUpdate: title,
					newValueToUpdate: title,
				},
			}),
		);
	};

	const handleOpenConfirmModal = id => {
		dispatch(
			openModal({
				type: MODAL_TYPES.CONFIRM,
				data: {
					id,
				},
			}),
		);
	};

	return (
		<>
			<div className={styles.card}>
				<div className={styles.cardInnerBlock}>
					<div className={styles.cardBody}>
						<div className={styles.cardActions}>
							<button
								type="button"
								className={styles.cardButton}
								onClick={() => handleOpenEditModal(id, title)}
							>
								<RiEditBoxFill className="icon iconCardCategory" />
							</button>
							<button
								type="button"
								className={styles.cardButton}
								onClick={() => handleOpenConfirmModal(id)}
							>
								<TbLayoutGridRemove className="icon iconCardCategory" />
							</button>
						</div>
						<span className={styles.cardTitle}>{title}</span>
					</div>
					<div className={styles.cardFooter}>
						<Link
							to={isSubcategoriesPage ? linkToProductsPage : linkToSubcategoriesPage}
							className={styles.cardLink}
						>
							<span className={styles.cardLinkText}>{cardLinkText}</span>
							<TbExternalLink className="icon iconCardCategoryLink" />
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};
