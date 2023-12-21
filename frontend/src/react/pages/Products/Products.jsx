import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "../../../utils";
import { SortingProductList } from "../../components";
import { ProductFilter } from "./components/ProductFilter/ProductFilter";
import { ProductCard } from "./components/ProductCard/ProductCard";
import styles from "./Products.module.scss";

export const Products = () => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [dataNotExist, setDataNotExist] = useState(false);

	const params = useParams();
	const navigate = useNavigate();

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
				}
			})
			.catch(e => console.log(e.message))
			.finally(() => {
				setIsLoading(false);
			});
	}, [navigate, params.id]);

	return (
		<div className={styles.products}>
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
							{!isLoading
								? !dataNotExist && (
										<>
											{products.map(
												({ publicId, id, title, specs, price, previewImageUrl }) => {
													return (
														<ProductCard
															key={id}
															publicId={publicId}
															productId={id}
															title={title}
															specs={specs}
															price={price}
															previewImageUrl={previewImageUrl}
														/>
													);
												},
											)}
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
