import { useDispatch } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { deleteProductFromBasket } from "../../../../store/actions";
import { CountSwitcher, ActionButton, ProductInfo } from "../../../../components";
import styles from "./BasketItem.module.scss";

export const BasketItem = ({
	title,
	specs,
	price,
	publicId,
	productId,
	productCount,
	previewImageUrl,
}) => {
	const dispatch = useDispatch();

	const handleDeleteProduct = currentProductId => {
		dispatch(deleteProductFromBasket(currentProductId));
	};

	return (
		<li className={styles.item}>
			<div className={styles.itemInnerWrapper}>
				<ProductInfo
					title={title}
					specs={specs}
					publicId={publicId}
					productId={productId}
					previewImageUrl={previewImageUrl}
				/>
			</div>
			<div className={styles.itemInnerWrapper}>
				<CountSwitcher productId={productId} productCount={productCount} />
			</div>
			<div className={`${styles.itemInnerWrapper} ${styles.price}`}>
				<span className={styles.itemText}>{price} ₽</span>
			</div>
			<div className={styles.itemInnerWrapper}>
				<ActionButton
					icon={<FaTrashAlt className="icon iconTrash" />}
					clickFunction={() => handleDeleteProduct(productId)}
				/>
			</div>
		</li>
	);
};
