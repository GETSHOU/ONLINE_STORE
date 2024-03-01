import {
	PiArrowFatLeftFill,
	PiArrowFatRightFill,
	PiArrowFatLinesLeftFill,
	PiArrowFatLinesRightFill,
} from "react-icons/pi";
import styles from "./Pagination.module.scss";

export const Pagination = ({ lastPage, currentPage, setCurrentPage }) => {
	return (
		<div className={styles.pagination}>
			<div className={styles.paginationList}>
				<button
					className={styles.paginationItem}
					disabled={currentPage === 1}
					onClick={() => setCurrentPage(1)}
				>
					<PiArrowFatLinesLeftFill className="icon iconPagination" />
				</button>
				<button
					className={styles.paginationItem}
					disabled={currentPage === 1}
					onClick={() => setCurrentPage(currentPage - 1)}
				>
					<PiArrowFatLeftFill className="icon iconPagination" />
				</button>
				<div className={`${styles.paginationItem} ${styles.paginationItemCurrent}`}>
					{currentPage}
				</div>
				<button
					className={styles.paginationItem}
					disabled={currentPage === lastPage}
					onClick={() => setCurrentPage(currentPage + 1)}
				>
					<PiArrowFatRightFill className="icon iconPagination" />
				</button>
				<button
					className={styles.paginationItem}
					disabled={currentPage === lastPage}
					onClick={() => setCurrentPage(lastPage)}
				>
					<PiArrowFatLinesRightFill className="icon iconPagination" />
				</button>
			</div>
		</div>
	);
};
