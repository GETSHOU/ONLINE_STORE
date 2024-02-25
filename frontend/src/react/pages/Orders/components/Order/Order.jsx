import { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { formatServerDate } from "../../../../../utils";
import { OrderPreview } from "../OrderPreview/OrderPreview";
import styles from "./Order.module.scss";

export const Order = ({ products, orderedAt, totalCount, totalPrice, publicOrderId }) => {
	const [displayState, setDisplayState] = useState(false);

	const changeDisplayState = () => setDisplayState(!displayState);

	return (
		<li className={styles.order}>
			<button type="button" className={styles.order__button} onClick={changeDisplayState}>
				<div className={styles.order__icon}>
					{displayState ? (
						<IoIosArrowUp className="icon iconDisplayContent iconActive" />
					) : (
						<IoIosArrowDown className="icon iconDisplayContent" />
					)}
				</div>
				<div className={styles.order__blockText}>
					<span className={styles.order__buttonText}>
						Заказ № <span className={styles.order__textBold}>{publicOrderId}</span> от{" "}
						<span className={styles.order__textBold}>{formatServerDate(orderedAt)}</span>
					</span>
					<span className={styles.order__moreDetails}>
						Кликните, чтобы узнать подробности заказа
					</span>
				</div>
				<div className={styles.order__price}>
					<span className={styles.order__priceText}>
						{totalPrice} ₽ / {totalCount} шт.
					</span>
				</div>
			</button>
			{displayState && (
				<div className={styles.order__details}>
					<h4 className={styles.order__detailsTitle}>Список товаров</h4>
					{products.map(({ product, productCount }) => {
						return (
							<OrderPreview
								key={product.id}
								product={product}
								productCount={productCount}
							/>
						);
					})}
				</div>
			)}
		</li>
	);
};
