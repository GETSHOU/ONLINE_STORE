import { useSelector } from "react-redux";
import { basketSelector } from "../../../../store/selectors";
import { getTotalCountProducts, getTotalPriceProducts } from "../../../../../utils";
import { Button } from "../../../../components";
import styles from "./PaymentDetails.module.scss";

export const PaymentDetails = () => {
	const basket = useSelector(basketSelector);

	return (
		<form className={styles.form}>
			<div className={styles.info}>
				<p className={styles.textRow}>
					Ваши товары ({getTotalCountProducts(basket)})
					<span className={styles.price}>{getTotalPriceProducts(basket)} ₽</span>
				</p>
			</div>
			<div className={styles.total}>
				<p className={styles.textRow}>
					Итого к оплате:
					<span className={styles.totalPrice}>{getTotalPriceProducts(basket)} ₽</span>
				</p>
			</div>
			<Button type="submit" text="Оформить заказ" />
		</form>
	);
};
