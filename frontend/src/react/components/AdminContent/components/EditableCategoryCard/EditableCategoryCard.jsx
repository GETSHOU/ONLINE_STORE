import { Link } from "react-router-dom";
import { RiEditBoxFill } from "react-icons/ri";
import { TbLayoutGridRemove, TbExternalLink } from "react-icons/tb";
import styles from "./EditableCategoryCard.module.scss";

export const EditableCategoryCard = ({ linkTitle, handleEdit, handleRemove }) => {
	return (
		<div className={styles.card}>
			<div className={styles.cardActions}>
				<button className={styles.cardButton} type="button" onClick={handleEdit}>
					<RiEditBoxFill className="icon iconCardCategory" />
				</button>
				<button className={styles.cardButton} type="button" onClick={handleRemove}>
					<TbLayoutGridRemove className="icon iconCardCategory" />
				</button>
			</div>
			<Link className={styles.cardLink}>
				<span className={styles.cardLinkText}>{linkTitle}</span>
				<TbExternalLink className="icon iconCardCategoryLink" />
			</Link>
		</div>
	);
};
