import { Link } from "react-router-dom";
import { RiEditBoxFill } from "react-icons/ri";
import { TbLayoutGridRemove, TbExternalLink } from "react-icons/tb";
import styles from "./EditCategoryCard.module.scss";

export const EditCategoryCard = ({
	id,
	handleEdit,
	handleRemove,
	cardLinkText,
	categoryTitle,
	isSubcategoriesPage,
}) => {
	const linkToProductsPage = `/subcategories-m/${id}/products-m`;
	const linkToSubcategoriesPage = `/categories-m/${id}/subcategories-m`;

	return (
		<div className={styles.card}>
			<div className={styles.cardInnerBlock}>
				<div className={styles.cardBody}>
					<div className={styles.cardActions}>
						<button className={styles.cardButton} type="button" onClick={handleEdit}>
							<RiEditBoxFill className="icon iconCardCategory" />
						</button>
						<button className={styles.cardButton} type="button" onClick={handleRemove}>
							<TbLayoutGridRemove className="icon iconCardCategory" />
						</button>
					</div>
					<span className={styles.cardTitle}>{categoryTitle}</span>
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
