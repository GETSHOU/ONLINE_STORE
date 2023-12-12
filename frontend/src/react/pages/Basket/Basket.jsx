import { BasketItem } from "./components/BasketItem/BasketItem";
import { PaymentDetails } from "./components/PaymentDetails/PaymentDetails";
import { EmptyBasket } from "./components/EmptyBasket/EmptyBasket";
import styles from "./Basket.module.scss";

export const Basket = ({ pageTitle }) => {
	return (
		<div className={styles.wrapper}>
			{/* <div className={styles.content}>
				<ul className={styles.list}>
					<BasketItem id={1} />
					<BasketItem id={2} />
					<BasketItem id={3} />
					<BasketItem id={4} />
					<BasketItem id={5} />
				</ul>
				<div className={styles.paymentDetails}>
					<PaymentDetails />
				</div>
			</div> */}
			<EmptyBasket />
		</div>
	);
};
