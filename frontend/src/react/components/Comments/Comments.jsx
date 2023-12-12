import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdSend } from "react-icons/io";
import { createComment } from "../../store/actions";
import { getCommentsCount, request } from "../../../utils";
import { Comment } from "./components/Comment";
import styles from "./Comments.module.scss";

export const Comments = ({ comments, productId }) => {
	const [newComment, setNewComment] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);

	const dispatch = useDispatch();

	const userIsLoggedIn = useSelector(({ user }) => user.isLoggedIn);

	const handleCreateComment = (productId, content) => {
		const trimmedContent = content.trim();

		setIsLoading(true);
		setNewComment("");

		request(`/api/products/${productId}/comments/create`, "POST", {
			content: trimmedContent,
		})
			.then(response => {
				if (!content) {
					return;
				}
				dispatch(createComment(response.data));
				setIsDisabled(true);
			})
			.catch(e => console.log(e.message))
			.finally(() => {
				setIsLoading(false);
			});
	};

	const onChangeText = ({ target }) => {
		setNewComment(target.value);

		if (target.value.trim().length !== 0) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.wrapperTitle}>
				<h2 className={styles.title}>{getCommentsCount(comments.length)}</h2>
			</div>
			<div className={styles.comments}>
				{userIsLoggedIn && (
					<div className={styles.commentsField}>
						<textarea
							className={styles.commentsTextarea}
							name="comment"
							placeholder={isLoading ? "" : "Написать комментарий..."}
							value={newComment}
							onChange={onChangeText}
							rows="6"
							readOnly={isLoading && true}
						/>
						<button
							className={styles.button}
							disabled={isDisabled}
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
