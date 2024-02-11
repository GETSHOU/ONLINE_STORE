import { useSelector } from "react-redux";
import { basketSelector } from "../../store/selectors";
import { PageTitle } from "../../components";
import { BasketCard } from "./components/BasketCard/BasketCard";
import { EmptyBasket } from "./components/EmptyBasket/EmptyBasket";
import { PaymentDetails } from "./components/PaymentDetails/PaymentDetails";
import styles from "./Basket.module.scss";

export const Basket = () => {
	const basket = useSelector(basketSelector);

	return (
		<div className={styles.wrapper}>
			<PageTitle title="Корзина" />
			{Array.isArray(basket) ? (
				<>
					{basket.length !== 0 ? (
						<div className={styles.content}>
							<ul className={styles.list}>
								{basket.map(({ product, productCount }) => {
									return (
										<BasketCard
											key={product.id}
											title={product.title}
											specs={product.specs}
											price={product.price}
											publicId={product.publicId}
											productId={product.id}
											productCount={productCount}
											previewImageUrl={product.previewImageUrl}
										/>
									);
								})}
							</ul>
							<div className={styles.paymentDetails}>
								<PaymentDetails />
							</div>
						</div>
					) : (
						<EmptyBasket />
					)}
				</>
			) : null}
		</div>
	);
};
