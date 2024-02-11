import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/actions";
import { getCommentsCount } from "../../../utils";
import { MODAL_TYPES } from "../../../constants";
import { Comment } from "./components/Comment/Comment";
import { CommentSkeleton } from "./components/Comment/components/CommentSkeleton/CommentSkeleton";
import { CommentTextarea } from "./components/CommentTextarea/CommentTextarea";
import { CommentTextareaSkeleton } from "./components/Comment/components/CommentTextareaSkeleton/CommentTextareaSkeleton";

import "react-loading-skeleton/dist/skeleton.css";
import styles from "./Comments.module.scss";

export const Comments = ({ comments, productId, serverError, loadingStatus }) => {
	const dispatch = useDispatch();
	const userIsLoggedIn = useSelector(({ user }) => user.isLoggedIn);

	const handleOpenAuthModal = () =>
		dispatch(openModal({ type: MODAL_TYPES.AUTHORIZATION }));

	return (
		<div className={styles.wrapper}>
			{!loadingStatus ? (
				!serverError && (
					<div className={styles.wrapperTitle}>
						<h2 className={styles.title}>
							{comments.length > 0
								? getCommentsCount(comments.length)
								: "Комментариев нет"}
						</h2>
					</div>
				)
			) : (
				<div className={styles.wrapperTitle}>
					<Skeleton inline={true} height={"1.3rem"} width={250} />
				</div>
			)}
			<div className={styles.comments}>
				{userIsLoggedIn ? (
					!loadingStatus ? (
						!serverError && <CommentTextarea productId={productId} />
					) : (
						<CommentTextareaSkeleton inline={true} />
					)
				) : (
					!serverError && (
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
					)
				)}
				<div className={styles.commentsList}>
					{!loadingStatus ? (
						!serverError &&
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
