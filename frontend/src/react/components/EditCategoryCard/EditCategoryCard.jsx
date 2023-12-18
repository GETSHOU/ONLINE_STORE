import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RiEditBoxFill } from "react-icons/ri";
import { TbLayoutGridRemove, TbExternalLink } from "react-icons/tb";
import { openModal } from "../../store/actions";
import { MODAL_TYPES } from "../../../constants";
import styles from "./EditCategoryCard.module.scss";

export const EditCategoryCard = ({
	id,
	title,
	cardLinkText,
	isCategoriesPage,
	isSubcategoriesPage,
}) => {
	const linkToProductsPage = `/subcategories-m/${id}/products-m`;
	const linkToSubcategoriesPage = `/categories-m/${id}/subcategories-m`;

	const dispatch = useDispatch();

	const handleOpenEditModal = (id, title) => {
		dispatch(
			openModal({
				type: MODAL_TYPES.EDIT_CATEGORY,
				data: {
					id,
					title,
					newTitle: title,
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
		<div className={styles.card}>
			<div className={styles.cardInnerBlock}>
				<div className={styles.cardBody}>
					<div className={styles.cardActions}>
						<button
							className={styles.cardButton}
							type="button"
							onClick={() => handleOpenEditModal(id, title)}
						>
							<RiEditBoxFill className="icon iconCardCategory" />
						</button>
						<button
							className={styles.cardButton}
							type="button"
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
	);
};
