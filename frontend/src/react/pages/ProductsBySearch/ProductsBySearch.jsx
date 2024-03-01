import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	toggleSearchPage,
	toggleSearchPageDefault,
	getFoundedProductsAsync,
	getSortedAllProductsAsync,
	productsSearchPageDefault,
} from "../../store/actions";
import { productsErrorSelector, productsFoundedSelector } from "../../store/selectors";
import { PAGINATION } from "../../../constants";
import {
	PageTitle,
	Pagination,
	ProductsList,
	ProductsContent,
	SortingProductList,
} from "../../components";
import styles from "./ProductsBySearch.module.scss";

export const ProductsBySearch = memo(
	({ searchQuery, shouldSearch, searchCompleted, setSearchCompleted }) => {
		const lastPage = useSelector(productsFoundedSelector).lastPage;
		const serverError = useSelector(productsErrorSelector);
		const currentPage = useSelector(productsFoundedSelector).currentPage;
		const loadingStatus = useSelector(productsFoundedSelector).loadingStatus;
		const foundedProducts = useSelector(productsFoundedSelector).products;
		const countFoundedProducts = useSelector(
			productsFoundedSelector,
		).countFoundedProducts;

		const dispatch = useDispatch();

		useEffect(() => {
			if (shouldSearch && currentPage !== 1) {
				dispatch(toggleSearchPageDefault());
			}
			if (!searchCompleted && searchQuery !== "") {
				dispatch(
					getFoundedProductsAsync(searchQuery, currentPage, PAGINATION.LIMIT),
				).finally(() => {
					setSearchCompleted(true);
				});
			}
		}, [dispatch, shouldSearch, currentPage, searchCompleted]);

		useEffect(() => {
			return () => {
				dispatch(productsSearchPageDefault());
			};
		}, [dispatch]);

		const handleSorting = sortType => dispatch(getSortedAllProductsAsync(sortType));

		const setCurrentPage = page => {
			setSearchCompleted(false);
			dispatch(toggleSearchPage(page));
		};

		return (
			<div className={styles.wrapper}>
				<PageTitle
					title={`Найдено товаров: ${countFoundedProducts}`}
					loadingStatus={loadingStatus}
				/>
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
				{lastPage > 1 && foundedProducts.length > 0 && (
					<Pagination
						lastPage={lastPage}
						currentPage={Number(currentPage)}
						setCurrentPage={setCurrentPage}
					/>
				)}
			</div>
		);
	},
);
