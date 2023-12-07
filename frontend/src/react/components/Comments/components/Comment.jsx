import { FaTrashAlt } from "react-icons/fa";
import { ActionButton } from "../../ActionButton/ActionButton";
import styles from "./Comment.module.scss";

export const Comment = () => {
	const handleDelete = () => {
		console.log("Comment is DELETED");
	};

	return (
		<div className={styles.comment}>
			<header className={styles.commentHeader}>
				<div className={styles.commentAuthor}>{"Сергей"}</div>
				<div className={styles.commentActions}>
					<ActionButton
						icon={<FaTrashAlt className="icon iconTrash" />}
						clickFunction={handleDelete}
					/>
				</div>
			</header>
			<div className={styles.commentBody}>
				<p className={styles.commentText}>
					{
						"Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей."
					}
				</p>
			</div>
			<footer className={styles.commentFooter}>
				<span className={styles.commentDate}>{"26.11.2023, 21:19:55"}</span>
			</footer>
		</div>
	);
};
