import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io";
import { SORTING_TYPE } from "../../../constants";
import styles from "./SortingProductList.module.scss";

export const SortingProductList = ({ handleSorting }) => {
	return (
		<div className={styles.sorting}>
			<div className={styles.sortingInnerWrapper}>
				<span className={styles.sortingText}>Сортировка:</span>
			</div>
			<div className={styles.sortingInnerWrapper}>
				<button
					className={styles.sortingButton}
					type="button"
					onClick={() => handleSorting(SORTING_TYPE.BY_ASC)}
				>
					<span className={styles.sortingButtonText}>Цена по возрастанию</span>
					<IoMdArrowRoundUp className="icon iconArrowDropup" />
				</button>
			</div>
			<div className={styles.sortingInnerWrapper}>
				<button
					className={styles.sortingButton}
					type="button"
					onClick={() => handleSorting(SORTING_TYPE.BY_DESC)}
				>
					<span className={styles.sortingButtonText}>Цена по убыванию</span>
					<IoMdArrowRoundDown className="icon iconArrowDropdown" />
				</button>
			</div>
		</div>
	);
};
