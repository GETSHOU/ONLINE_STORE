import { useSelector } from "react-redux";
import { clearCreateOrderServerMessages } from "../../store/actions";
import { basketSelector, ordersCreateSuccessSelector } from "../../store/selectors";
import { Toastify, PageTitle, EmptyData } from "../../components";
import { BasketCard } from "./components/BasketCard/BasketCard";
import { PaymentDetails } from "./components/PaymentDetails/PaymentDetails";
import styles from "./Basket.module.scss";

export const Basket = () => {
	const basket = useSelector(basketSelector);
	const serverSuccess = useSelector(ordersCreateSuccessSelector);

	return (
		<>
			<div className={styles.wrapper}>
				<PageTitle title="Корзина" />
				{Array.isArray(basket) && (
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
							<>
								<EmptyData basket={!!basket} />
								{!!serverSuccess && (
									<Toastify
										success={serverSuccess}
										action={clearCreateOrderServerMessages}
									/>
								)}
							</>
						)}
					</>
				)}
			</div>
		</>
	);
};
