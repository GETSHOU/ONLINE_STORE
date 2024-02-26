import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io";
import { productsService } from "../../../services";
import { getSortedProducts } from "../../store/actions";
import { productsSelector } from "../../store/selectors";
import { ACTION_TYPE, SORTING_TYPE } from "../../../constants";
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
				dispatch({
					type: ACTION_TYPE.SET_SORTED_PRODUCTS_BY_ASC_ERROR,
					payload: e.message,
				});
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
