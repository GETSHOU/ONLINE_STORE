import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAsync } from "../../store/actions";
import {
	productsSelector,
	productsErrorSelector,
	productsTitleSelector,
	productsLoadingStatusSelector,
} from "../../store/selectors";
import { PageTitle, SortingProductList, ProductCardSkeleton } from "../../components";
import { ProductCard } from "./components/ProductCard/ProductCard";
import { ProductFilter } from "./components/ProductFilter/ProductFilter";
import styles from "./Products.module.scss";

export const Products = () => {
	const products = useSelector(productsSelector);
	const serverError = useSelector(productsErrorSelector);
	const productsTitle = useSelector(productsTitleSelector);
	const loadingStatus = useSelector(productsLoadingStatusSelector);

	const params = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProductsAsync(params.id));
	}, [dispatch, params.id]);

	return (
		<div className={styles.products}>
			<PageTitle title={productsTitle} loadingStatus={loadingStatus} />
			<div className={styles.content}>
				{/* <div className={`${styles.contentInnerWrapper} ${styles.filter}`}>
					<ProductFilter />
				</div> */}
				<div className={`${styles.contentInnerWrapper} ${styles.content}`}>
					<div className={styles.contentHeader}>
						<SortingProductList />
					</div>
					<div className={styles.contenMain}>
						<ul className={styles.list}>
							{!loadingStatus ? (
								<>
									{products.map(product => {
										return <ProductCard key={product.id} product={product} />;
									})}
								</>
							) : (
								<ProductCardSkeleton inline={false} products={3} />
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
