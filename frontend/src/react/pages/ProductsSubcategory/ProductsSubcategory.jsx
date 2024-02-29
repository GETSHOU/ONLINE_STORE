import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAsync, getSortedProductsAsync } from "../../store/actions";
import {
	productsSelector,
	productsErrorSelector,
	productsTitleSelector,
	productsLoadingStatusSelector,
} from "../../store/selectors";
import {
	PageTitle,
	ProductsList,
	ProductsContent,
	SortingProductList,
} from "../../components";
import styles from "./ProductsSubcategory.module.scss";

export const ProductsSubcategory = () => {
	const products = useSelector(productsSelector);
	const serverError = useSelector(productsErrorSelector);
	const productsTitle = useSelector(productsTitleSelector);
	const loadingStatus = useSelector(productsLoadingStatusSelector);

	const params = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProductsAsync(params.id));
	}, [dispatch, params.id]);

	const handleSorting = sortType => dispatch(getSortedProductsAsync(params.id, sortType));

	return (
		<div className={styles.wrapper}>
			<PageTitle
				title={productsTitle}
				serverError={serverError}
				loadingStatus={loadingStatus}
			/>
			<ProductsContent>
				<SortingProductList handleSorting={handleSorting} />
				<ProductsList
					data={products}
					serverError={serverError}
					loadingStatus={loadingStatus}
				/>
			</ProductsContent>
		</div>
	);
};
