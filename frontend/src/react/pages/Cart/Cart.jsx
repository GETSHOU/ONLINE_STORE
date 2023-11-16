import { PageTitle } from "../../components";
import { CartItem } from "./components/CartItem/CartItem";
import { PaymentDetails } from "./components/PaymentDetails/PaymentDetails";
import styles from "./Cart.module.scss";

export const Cart = () => {
	return (
		<div className={styles.wrapper}>
			<PageTitle title="Корзина" />
			<div className={styles.content}>
				<ul className={styles.list}>
					<CartItem id={1} />
					<CartItem id={2} />
					<CartItem id={3} />
					<CartItem id={4} />
					<CartItem id={5} />
				</ul>
				<div className={styles.paymentDetails}>
					<PaymentDetails />
				</div>
			</div>
		</div>
	);
};
