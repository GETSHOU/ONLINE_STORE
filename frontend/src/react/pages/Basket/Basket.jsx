import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCreateOrderServerMessages } from "../../store/actions";
import {
	basketSelector,
	ordersCreateErrorSelector,
	ordersCreateSuccessSelector,
} from "../../store/selectors";
import { Toastify, PageTitle, EmptyData } from "../../components";
import { BasketCard } from "./components/BasketCard/BasketCard";
import { PaymentDetails } from "./components/PaymentDetails/PaymentDetails";
import styles from "./Basket.module.scss";

export const Basket = () => {
	const basket = useSelector(basketSelector);
	const serverError = useSelector(ordersCreateErrorSelector);
	const serverSuccess = useSelector(ordersCreateSuccessSelector);

	const dispatch = useDispatch();

	const serverMessage = !!serverError || !!serverSuccess;

	useEffect(() => {
		return () => {
			dispatch(clearCreateOrderServerMessages());
			console.log("Destroyed Basket");
		};
	}, [dispatch]);

	const onClose = useCallback(() => dispatch(clearCreateOrderServerMessages()), []);

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
							<EmptyData basket={!!basket} />
						)}
					</>
				)}
			</div>
			{serverMessage && (
				<Toastify error={serverError} success={serverSuccess} onClose={onClose} />
			)}
		</>
	);
};
