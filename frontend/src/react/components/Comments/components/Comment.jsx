import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { RiEditBoxFill } from "react-icons/ri";
import { VscChromeClose } from "react-icons/vsc";
import { updateCommentAsync, deleteCommentAsync } from "../../../store/actions";
import { commentErrorSelector, userRoleSelector } from "../../../store/selectors";
import { checkAccess, formatServerDate } from "../../../../utils";
import { ROLES } from "../../../../constants";
import { ActionButton } from "../../ActionButton/ActionButton";
import styles from "./Comment.module.scss";

export const Comment = ({
	content,
	productId,
	commentId,
	updatedAt,
	authorName,
	publishedAt,
	authorRoleId,
	createdRows,
}) => {
	const [isEdit, setIsEdit] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [valueEdit, setValueEdit] = useState(content);
	const [valueEditChanged, setValueEditChanged] = useState(false);

	const roleId = useSelector(userRoleSelector);
	const serverError = useSelector(commentErrorSelector);

	const inputRef = useRef(null);
	const dispatch = useDispatch();

	const handleChange = ({ target }) => {
		const trimmedUpdatedComment = target.value.trim();

		if (content !== trimmedUpdatedComment && trimmedUpdatedComment !== "") {
			setValueEditChanged(true);

			if (trimmedUpdatedComment.length === 0) {
				setValueEditChanged(false);
			}
		} else {
			setValueEditChanged(false);
		}

		setValueEdit(target.value);
	};

	const handleUpdate = (commentId, updatedComment) => {
		setIsDisabled(true);

		dispatch(updateCommentAsync(commentId, { content: updatedComment })).finally(() => {
			setValueEditChanged(false);
			setIsDisabled(false);
			setIsEdit(false);
		});
	};

	const handleDelete = (productId, commentId) => {
		setIsDisabled(true);

		dispatch(deleteCommentAsync(productId, commentId)).finally(() =>
			setIsDisabled(false),
		);
	};

	const handleEdit = () => {
		if (inputRef?.current) {
			inputRef.current.focus();
		}

		setIsEdit(true);
	};

	const handleCancel = currentText => {
		if (inputRef?.current) {
			inputRef.current.focus();
		}

		setIsEdit(false);
		setValueEdit(currentText);
		setValueEditChanged(false);
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
						{!isEdit ? (
							<>
								<ActionButton
									icon={<RiEditBoxFill className="icon iconEdit" />}
									isDisabled={isDisabled}
									clickFunction={() => handleEdit()}
								/>
								<ActionButton
									icon={<FaTrashAlt className="icon iconTrash" />}
									isDisabled={isDisabled}
									clickFunction={() => handleDelete(productId, commentId)}
								/>
							</>
						) : (
							<>
								<ActionButton
									icon={<GiCheckMark className="icon iconConfirm" />}
									isDisabled={!valueEditChanged || isDisabled}
									clickFunction={() => handleUpdate(commentId, valueEdit.trim())}
								/>
								<ActionButton
									icon={<VscChromeClose className="icon iconCancel" />}
									clickFunction={() => handleCancel(content)}
								/>
							</>
						)}
					</div>
				)}
			</header>
			<div className={styles.commentBody}>
				{/* <textarea
					ref={inputRef}
					type="text"
					// style={{ height: textAreaRows * 1.8 + "rem" }}
					value={valueEdit}
					readOnly={!isEdit}
					className={
						!isEdit
							? `${styles.commentText}`
							: `${styles.commentText} ${styles.commentTextEditing}`
					}
					onChange={handleChange}
				/> */}
				<p>{valueEdit}</p>
			</div>
			<footer className={styles.commentFooter}>
				<span className={styles.commentDate}>
					Отправлен: {formatServerDate(publishedAt)}
				</span>
				{publishedAt !== updatedAt && (
					<span className={styles.commentDate}>
						Обновлён: {formatServerDate(updatedAt)}
					</span>
				)}
			</footer>
		</div>
	);
};
