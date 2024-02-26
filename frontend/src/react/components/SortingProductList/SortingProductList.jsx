import { useDispatch } from "react-redux";
import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io";
import { productsService } from "../../../services";
import { getSortedProducts, getSortedProductsError } from "../../store/actions";
import { SORTING_TYPE } from "../../../constants";
import styles from "./SortingProductList.module.scss";

export const SortingProductList = ({ subcategoryId }) => {
	const dispatch = useDispatch();

	const handleSorting = (subcategoryId, sortType) => {
		productsService
			.getSortedProducts(subcategoryId, sortType)
			.then(res => {
				if (res.error) {
					throw new Error(res.error);
				}

				dispatch(getSortedProducts(res.data, sortType));
			})
			.catch(e => {
				dispatch(getSortedProductsError(e.message, sortType));
			});
	};

	return (
		<div className={styles.sorting}>
			<div className={styles.sortingInnerWrapper}>
				<span className={styles.sortingText}>Сортировка:</span>
			</div>
			<div className={styles.sortingInnerWrapper}>
				<button
					className={styles.sortingButton}
					type="button"
					onClick={() => handleSorting(subcategoryId, SORTING_TYPE.BY_ASC)}
				>
					<span className={styles.sortingButtonText}>Цена по возрастанию</span>
					<IoMdArrowRoundUp className="icon iconArrowDropup" />
				</button>
			</div>
			<div className={styles.sortingInnerWrapper}>
				<button
					className={styles.sortingButton}
					type="button"
					onClick={() => handleSorting(subcategoryId, SORTING_TYPE.BY_DESC)}
				>
					<span className={styles.sortingButtonText}>Цена по убыванию</span>
					<IoMdArrowRoundDown className="icon iconArrowDropdown" />
				</button>
			</div>
		</div>
	);
};
