import { IoMdCart } from "react-icons/io";
import { Button } from "../Button/Button";
import styles from "./ProductDetails.module.scss";

export const ProductDetails = ({ product }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.price}>
				<span className={styles.priceText}>{product.price} ₽</span>
			</div>
			<div className={styles.actions}>
				<Button
					type="button"
					text="В корзину"
					icon={<IoMdCart className="icon iconButton" />}
				/>
			</div>
		</div>
	);
};
