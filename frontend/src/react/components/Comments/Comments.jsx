import Skeleton from "react-loading-skeleton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdSend } from "react-icons/io";
import { createCommentAsync, openModal } from "../../store/actions";
import { getCommentsCount } from "../../../utils";
import { MODAL_TYPES } from "../../../constants";
import { Comment } from "./components/Comment";
import { CommentSkeleton } from "../Skeleton/CommentSkeleton/CommentSkeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./Comments.module.scss";

export const Comments = ({ comments, productId, productLoadingStatus }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);
	const [newComment, setNewComment] = useState("");

	const userIsLoggedIn = useSelector(({ user }) => user.isLoggedIn);
	const dispatch = useDispatch();

	const handleCreateComment = (productId, content) => {
		setIsLoading(true);
		setIsDisabled(true);
		setNewComment("");

		dispatch(createCommentAsync(productId, content.trim())).finally(() => {
			setIsLoading(false);
			setIsDisabled(false);
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

	const handleOpenAuthModal = () =>
		dispatch(openModal({ type: MODAL_TYPES.AUTHORIZATION }));

	return (
		<div className={styles.wrapper}>
			<div className={styles.wrapperTitle}>
				{!productLoadingStatus ? (
					<h2 className={styles.title}>
						{comments.length > 0 ? getCommentsCount(comments.length) : "Комментариев нет"}
					</h2>
				) : (
					<Skeleton inline={true} height={"1.3rem"} width={250} />
				)}
			</div>
			<div className={styles.comments}>
				{userIsLoggedIn ? (
					<div className={styles.commentsField}>
						<textarea
							className={styles.commentsTextarea}
							name="comment"
							placeholder={isLoading ? "" : "Написать комментарий..."}
							value={newComment}
							onChange={onChangeText}
							rows={5}
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
				) : (
					<div className={styles.notification}>
						<div className={styles.notification__text}>
							<button
								className={styles.notification__button}
								onClick={handleOpenAuthModal}
							>
								<span className={styles.notification__buttonText}>Авторизуйтесь</span>
							</button>
							, чтобы писать комментарии!
						</div>
					</div>
				)}
				<div className={styles.commentsList}>
					{!productLoadingStatus ? (
						comments.map(
							({ id, content, updatedAt, authorName, publishedAt, authorRoleId }) => {
								return (
									<Comment
										key={id}
										content={content}
										productId={productId}
										commentId={id}
										updatedAt={updatedAt}
										authorName={authorName}
										publishedAt={publishedAt}
										authorRoleId={authorRoleId}
									/>
								);
							},
						)
					) : (
						<CommentSkeleton inline={true} />
					)}
				</div>
			</div>
		</div>
	);
};
