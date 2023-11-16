import { FaTrashAlt } from "react-icons/fa";
import { CountSwitcher, ActionButton, ProductInfo } from "../../../../components";
import styles from "./CartItem.module.scss";

export const CartItem = ({ id }) => {
	const handleDelete = () => {
		console.log("Product is DELETED");
	};

	return (
		<li className={styles.cart}>
			<div className={styles.cartInnerWrapper}>
				<ProductInfo />
			</div>
			<div className={styles.cartInnerWrapper}>
				<CountSwitcher id={id} />
			</div>
			<div className={`${styles.cartInnerWrapper} ${styles.price}`}>
				<span className={styles.cartText}>1999 ₽</span>
			</div>
			<div className={styles.cartInnerWrapper}>
				<ActionButton
					icon={<FaTrashAlt className="icon iconTrash" />}
					clickFunction={handleDelete}
				/>
			</div>
		</li>
	);
};
