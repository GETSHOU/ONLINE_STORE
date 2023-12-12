import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { deleteComment } from "../../../store/actions";
import { userRoleSelector } from "../../../store/selectors";
import { checkAccess, formatServerDate, request } from "../../../../utils";
import { ROLES } from "../../../../constants";
import { ActionButton } from "../../ActionButton/ActionButton";
import styles from "./Comment.module.scss";

export const Comment = ({
	productId,
	commentId,
	authorName,
	authorRoleId,
	content,
	publishedAt,
}) => {
	const dispatch = useDispatch();
	const roleId = useSelector(userRoleSelector);

	const handleDeleteComment = (productId, commentId) => {
		request(`/api/products/${productId}/comments/${commentId}/delete`, "DELETE")
			.then(() => {
				dispatch(deleteComment(commentId));
			})
			.catch(e => console.log(e.message));
	};

	const isAdmin = checkAccess([ROLES.ADMIN], authorRoleId);
	const isModerator = checkAccess([ROLES.MODERATOR], authorRoleId);
	const AdminOrModerator = checkAccess([ROLES.ADMIN, ROLES.MODERATOR], roleId);

	return (
		<div className={styles.comment}>
			<header className={styles.commentHeader}>
				<div className={styles.commentAuthor}>
					{isAdmin
						? `${authorName} (Администратор)`
						: isModerator
						? `${authorName} (Модератор)`
						: authorName}
				</div>
				{AdminOrModerator && (
					<div className={styles.commentActions}>
						<ActionButton
							icon={<FaTrashAlt className="icon iconTrash" />}
							clickFunction={() => handleDeleteComment(productId, commentId)}
						/>
					</div>
				)}
			</header>
			<div className={styles.commentBody}>
				<p className={styles.commentText}>{content}</p>
			</div>
			<footer className={styles.commentFooter}>
				<span className={styles.commentDate}>{formatServerDate(publishedAt)}</span>
			</footer>
		</div>
	);
};
