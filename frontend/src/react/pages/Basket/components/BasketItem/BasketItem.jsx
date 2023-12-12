import { FaTrashAlt } from "react-icons/fa";
import { CountSwitcher, ActionButton, ProductInfo } from "../../../../components";
import styles from "./BasketItem.module.scss";

export const BasketItem = ({ id }) => {
	const handleDeleteProduct = () => {
		console.log("Товар удален");
	};

	return (
		<li className={styles.item}>
			<div className={styles.itemInnerWrapper}>
				<ProductInfo />
			</div>
			<div className={styles.itemInnerWrapper}>
				<CountSwitcher id={id} />
			</div>
			<div className={`${styles.itemInnerWrapper} ${styles.price}`}>
				<span className={styles.itemText}>1999 ₽</span>
			</div>
			<div className={styles.itemInnerWrapper}>
				<ActionButton
					icon={<FaTrashAlt className="icon iconTrash" />}
					clickFunction={handleDeleteProduct}
				/>
			</div>
		</li>
	);
};
