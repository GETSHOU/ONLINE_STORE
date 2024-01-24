import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSubcategoryTitle } from "../../store/actions";
import { subcategoryTitleSelector } from "../../store/selectors";
import { getCardTitle, request } from "../../../utils";
import { PageTitle, SortingProductList } from "../../components";
import { ProductFilter } from "./components/ProductFilter/ProductFilter";
import { ProductCard } from "./components/ProductCard/ProductCard";
import styles from "./Products.module.scss";

export const Products = () => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [dataNotExist, setDataNotExist] = useState(false);

	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const productTitle = useSelector(subcategoryTitleSelector);

	useEffect(() => {
		setIsLoading(true);

		request(`/api/subcategories/${params.id}/products`)
			.then(response => {
				if (!isLoading) {
					if (response.data.length === 0) {
						setDataNotExist(true);
						navigate("/products-not-exist", { replace: true });

						return;
					}

					setDataNotExist(false);
					setProducts(response.data);
					dispatch(setSubcategoryTitle(getCardTitle(response.data)));
				}
			})
			.catch(e => console.log(e.message))
			.finally(() => {
				setIsLoading(false);
			});
	}, [navigate, params.id]);

	return (
		<div className={styles.products}>
			<PageTitle title={productTitle} />
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
							{!isLoading
								? !dataNotExist && (
										<>
											{products.map(product => {
												return <ProductCard key={product.id} product={product} />;
											})}
										</>
								  )
								: null}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
