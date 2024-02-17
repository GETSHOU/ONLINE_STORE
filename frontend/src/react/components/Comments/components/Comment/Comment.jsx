import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { RiEditBoxFill } from "react-icons/ri";
import { VscChromeClose } from "react-icons/vsc";
import { updateCommentAsync, deleteCommentAsync } from "../../../../store/actions";
import { userRoleSelector } from "../../../../store/selectors";
import { checkAccess, formatServerDate } from "../../../../../utils";
import { ROLES } from "../../../../../constants";
import { ActionButton } from "../../../ActionButton/ActionButton";
import styles from "./Comment.module.scss";

export const Comment = ({
	content,
	productId,
	commentId,
	updatedAt,
	authorName,
	publishedAt,
	authorRoleId,
}) => {
	const [isEdit, setIsEdit] = useState(false);
	const [valueEdit, setValueEdit] = useState(content);
	const [isDisabled, setIsDisabled] = useState(false);
	const [valueEditChanged, setValueEditChanged] = useState(false);

	const roleId = useSelector(userRoleSelector);

	const inputRef = useRef(null);
	const dispatch = useDispatch();

	const handleChange = ({ target }) => {
		setValueEdit(target.value);

		if (target.value.length !== 0) {
			setValueEditChanged(true);
		} else {
			setValueEditChanged(false);
		}

		if (target.value.trim() === content) {
			setValueEditChanged(false);
		}
	};

	const handleUpdate = (commentId, updatedComment) => {
		setIsDisabled(true);

		const trimmedNewValueToUpdate = updatedComment.trim();

		if (trimmedNewValueToUpdate === content) {
			return;
		}

		dispatch(updateCommentAsync(commentId, { content: trimmedNewValueToUpdate })).finally(
			() => {
				setValueEditChanged(false);
				setIsDisabled(false);
				setIsEdit(false);
			},
		);
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
			<header className={styles.comment__header}>
				<div className={styles.comment__author}>
					{isAdmin
						? `${authorName} (Администратор)`
						: isModerator
						? `${authorName} (Модератор)`
						: authorName}
				</div>
				{AdminOrModerator && (
					<div className={styles.actions}>
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
									clickFunction={() => handleUpdate(commentId, valueEdit)}
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
			<div className={styles.comment__body}>
				{!isEdit ? (
					<span className={styles.comment__text}>{valueEdit}</span>
				) : (
					<textarea
						ref={inputRef}
						type="text"
						rows={5}
						value={valueEdit}
						className={styles.comment__textEditing}
						onChange={handleChange}
					/>
				)}
			</div>
			<footer className={styles.comment__footer}>
				<span className={styles.comment__date}>
					Отправлен: {formatServerDate(publishedAt)}
				</span>
				{publishedAt !== updatedAt && (
					<span className={styles.comment__date}>
						Обновлён: {formatServerDate(updatedAt)}
					</span>
				)}
			</footer>
		</div>
	);
};
