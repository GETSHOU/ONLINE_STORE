import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { Comment } from "./components/Comment";
import styles from "./Comments.module.scss";

export const Comments = ({ comments, productId }) => {
	const [newComment, setNewComment] = useState("");

	const onNewCommentAdd = (productId, text) => {
		console.log("Добавлен новый комментарий");
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.wrapperTitle}>
				<h2 className={styles.title}>Комментарии ({324})</h2>
			</div>
			<div className={styles.comments}>
				<div className={styles.commentsField}>
					<textarea
						className={styles.commentsTextarea}
						name="comment"
						placeholder="Написать комментарий..."
						value={newComment}
						onChange={({ target }) => setNewComment(target.value)}
						rows="6"
					/>
					<button
						className={styles.button}
						onClick={() => onNewCommentAdd(productId, newComment)}
					>
						<IoMdSend className="icon iconSendingComment" />
					</button>
				</div>
				<div className={styles.commentsList}>
					<Comment />
					<Comment />
					<Comment />
				</div>
			</div>
		</div>
	);
};
