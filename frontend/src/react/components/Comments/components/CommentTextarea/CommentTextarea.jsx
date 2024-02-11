import { useState } from "react";
import { useDispatch } from "react-redux";
import { IoMdSend } from "react-icons/io";
import { createCommentAsync } from "../../../../store/actions";
import styles from "./CommentTextarea.module.scss";

export const CommentTextarea = ({ productId }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);
	const [newComment, setNewComment] = useState("");

	const dispatch = useDispatch();

	const onChangeText = ({ target }) => {
		setNewComment(target.value);

		if (target.value.trim().length !== 0) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	};

	const handleCreateComment = (productId, content) => {
		setIsLoading(true);
		setIsDisabled(true);
		setNewComment("");

		dispatch(createCommentAsync(productId, content.trim())).finally(() => {
			setIsLoading(false);
			setIsDisabled(false);
		});
	};

	return (
		<div className={styles.textarea}>
			<textarea
				rows={5}
				name="comment"
				value={newComment}
				readOnly={isLoading}
				onChange={onChangeText}
				className={styles.textarea__field}
				placeholder={isLoading ? "" : "Написать комментарий..."}
			/>
			<button
				className={styles.textarea__button}
				disabled={isDisabled}
				onClick={() => handleCreateComment(productId, newComment)}
			>
				<IoMdSend className="icon iconSendingComment" />
			</button>
		</div>
	);
};
