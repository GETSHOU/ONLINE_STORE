import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFoundedProductsAsync, getSortedAllProductsAsync } from "../../store/actions";
import { productsErrorSelector, productsFoundedSelector } from "../../store/selectors";
import { PAGINATION } from "../../../constants";
import {
	PageTitle,
	ProductsList,
	ProductsContent,
	SortingProductList,
} from "../../components";
import styles from "./ProductsBySearch.module.scss";

export const ProductsBySearch = ({
	searchQuery,
	shouldSearch,
	searchCompleted,
	setSearchCompleted,
}) => {
	const [page, setPage] = useState(1);
	const serverError = useSelector(productsErrorSelector);
	const loadingStatus = useSelector(productsFoundedSelector).loadingStatus;
	const foundedProducts = useSelector(productsFoundedSelector).products;

	const dispatch = useDispatch();

	useEffect(() => {
		if (!searchCompleted && searchQuery !== "") {
			dispatch(getFoundedProductsAsync(searchQuery, page, PAGINATION.LIMIT)).finally(
				() => {
					setSearchCompleted(true);
				},
			);
		}
	}, [dispatch, shouldSearch, searchCompleted, page]);

	const handleSorting = sortType => dispatch(getSortedAllProductsAsync(sortType));

	return (
		<div className={styles.wrapper}>
			<PageTitle title={`Найдено товаров: ${foundedProducts.length}`} />
			<ProductsContent>
				{foundedProducts.length !== 0 && (
					<SortingProductList handleSorting={handleSorting} />
				)}
				<ProductsList
					data={foundedProducts}
					serverError={serverError}
					loadingStatus={loadingStatus}
				/>
			</ProductsContent>
		</div>
	);
};
