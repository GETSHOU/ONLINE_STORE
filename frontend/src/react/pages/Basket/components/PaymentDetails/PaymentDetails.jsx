import { Button } from "../../../../components";
import styles from "./PaymentDetails.module.scss";

export const PaymentDetails = () => {
	let costOfGoods = "42344";
	let costOfDelivery = "300";

	const totalPrice = (...numbers) => {
		return numbers.reduce((sum, num) => {
			let value = parseInt(num);
			return sum + value;
		}, 0);
	};

	return (
		<form className={styles.form}>
			<div className={styles.info}>
				<p className={styles.textRow}>
					Ваши товары (312)
					<span className={styles.price}>{costOfGoods} ₽</span>
				</p>
				<p className={styles.textRow}>
					Стоимость доставки:
					<span className={styles.price}>{costOfDelivery} ₽</span>
				</p>
			</div>
			<div className={styles.total}>
				<p className={styles.textRow}>
					Итого к оплате:
					<span className={styles.totalPrice}>
						{totalPrice(costOfGoods, costOfDelivery)} ₽
					</span>
				</p>
			</div>
			<Button type="submit" text="Оформить заказ" />
		</form>
	);
};
