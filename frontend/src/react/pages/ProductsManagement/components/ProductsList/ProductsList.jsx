import { ProductsTable } from "../ProductsTable/ProductsTable";
import { ProductsTableSkeleton } from "../ProductsTable/components/ProductsTableSkeleton/ProductsTableSkeleton";
import styles from "./ProductsList.module.scss";

export const ProductsList = ({ products, serverError, loadingStatus }) => {
	return (
		<div className={styles.list}>
			{!loadingStatus ? (
				!serverError &&
				products.map(
					({
						id,
						title,
						specs,
						price,
						vendor,
						publicId,
						vendorCode,
						previewImageUrl,
					}) => {
						return (
							<ProductsTable
								id={id}
								key={id}
								title={title}
								specs={specs}
								price={price}
								vendor={vendor}
								publicId={publicId}
								vendorCode={vendorCode}
								previewImageUrl={previewImageUrl}
							/>
						);
					},
				)
			) : (
				<ProductsTableSkeleton
					initial={true}
					products={1}
					baseColor="#B8B8B8"
					highlightColor="#CDCDCD"
				/>
			)}
		</div>
	);
};
