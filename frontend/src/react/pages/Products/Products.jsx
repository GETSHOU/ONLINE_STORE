import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setProducts, setProductsIsLoading } from "../../store/actions";
import { productsIsLoadingSelector, productsSelector } from "../../store/selectors";
import { getSectionTitle, request } from "../../../utils";
import { PageTitle, SortingProductList } from "../../components";
import { ProductCard } from "./components/ProductCard/ProductCard";
import { ProductFilter } from "./components/ProductFilter/ProductFilter";
import styles from "./Products.module.scss";

export const Products = () => {
	const params = useParams();
	const dispatch = useDispatch();

	const isLoading = useSelector(productsIsLoadingSelector);
	const products = useSelector(productsSelector);

	// const [isLoading, setIsLoading] = useState(true);
	// const [products, setProducts] = useState([]);

	useEffect(() => {
		dispatch(setProductsIsLoading(true));
		// setIsLoading(true);

		request(`/api/subcategories/${params.id}/products`)
			.then(response => {
				dispatch(setProducts(response.data));
				// setProducts(response.data);
			})
			.catch(e => console.log(e.message))
			.finally(() => {
				dispatch(setProductsIsLoading(false));
				// setIsLoading(false);
			});
	}, [dispatch, params]);

	const sectionTitle = getSectionTitle(products);

	return (
		<div className={styles.products}>
			<PageTitle title={!isLoading && sectionTitle} />
			<div className={styles.content}>
				<div className={`${styles.contentInnerWrapper} ${styles.filter}`}>
					<ProductFilter />
				</div>
				<div className={`${styles.contentInnerWrapper} ${styles.content}`}>
					<div className={styles.contentHeader}>
						<SortingProductList />
					</div>
					<div className={styles.contenMain}>
						<ul className={styles.list}>
							{isLoading ? null : (
								<>
									{products.map(({ id, title, specs, price, previewImageUrl }) => {
										return (
											<ProductCard
												key={id}
												productId={id}
												title={title}
												specs={specs}
												price={price}
												previewImageUrl={previewImageUrl}
											/>
										);
									})}
								</>
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
