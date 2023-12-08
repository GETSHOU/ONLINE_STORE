import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdSend } from "react-icons/io";
import { createComment } from "../../store/actions";
import { userRoleSelector } from "../../store/selectors";
import { checkAccess, getCommentsCount, request } from "../../../utils";
import { ROLES } from "../../../constants";
import { Comment } from "./components/Comment";
import styles from "./Comments.module.scss";

export const Comments = ({ comments, productId }) => {
	const [newComment, setNewComment] = useState("");

	const dispatch = useDispatch();
	const roleId = useSelector(userRoleSelector);

	const isGuest = checkAccess([ROLES.GUEST], roleId);

	const handleCreateComment = (productId, content) => {
		request(`/api/products/${productId}/comments/create`, "POST", { content }).then(
			response => {
				dispatch(createComment(response));
			},
		);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.wrapperTitle}>
				<h2 className={styles.title}>{getCommentsCount(comments.length)}</h2>
			</div>
			<div className={styles.comments}>
				{!isGuest && (
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
							onClick={() => handleCreateComment(productId, newComment)}
						>
							<IoMdSend className="icon iconSendingComment" />
						</button>
					</div>
				)}
				<div className={styles.commentsList}>
					{comments.map(({ id, authorName, authorRoleId, content, publishedAt }) => {
						return (
							<Comment
								key={id}
								productId={productId}
								commentId={id}
								authorName={authorName}
								authorRoleId={authorRoleId}
								content={content}
								publishedAt={publishedAt}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};
