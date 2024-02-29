import { ProductCard } from "../ProductCard/ProductCard";
import { ProductCardSkeleton } from "../ProductCard/components/ProductCardSkeleton/ProductCardSkeleton";
import styles from "./ProductsList.module.scss";

export const ProductsList = ({ data, serverError, loadingStatus }) => {
	return (
		<div className={styles.wrapper}>
			{!loadingStatus ? (
				!serverError && (
					<ul className={styles.list}>
						{data.map(product => {
							return <ProductCard key={product.id} product={product} />;
						})}
					</ul>
				)
			) : (
				<ul className={styles.list}>
					<ProductCardSkeleton products={3} />
				</ul>
			)}
		</div>
	);
};
