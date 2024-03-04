import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrderAsync } from "../../../../store/actions";
import { userIdSelector, basketSelector } from "../../../../store/selectors";
import { getTotalCountProducts, getTotalPriceProducts } from "../../../../../utils";
import { Form, Button } from "../../../../components";
import styles from "./PaymentDetails.module.scss";

export const PaymentDetails = ({ serverMessage, setShowToastify }) => {
	const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState(false);

	const userId = useSelector(userIdSelector);
	const basket = useSelector(basketSelector);

	const dispatch = useDispatch();

	const onSubmit = (userId, products, totalCount, totalPrice) => {
		setSubmitButtonIsDisabled(true);

		const filteredProducts = products.map(item => ({
			productId: item.product.id,
			productCount: item.productCount,
		}));

		dispatch(
			createOrderAsync(userId, { products: filteredProducts, totalCount, totalPrice }),
		).finally(() => {
			setSubmitButtonIsDisabled(false);
		});

		if (serverMessage) {
			setShowToastify(true);
		} else {
			return;
		}
	};

	return (
		<div className={styles.wrapper}>
			<Form>
				<div className={styles.details}>
					<div className={styles.details__count}>
						<p className={styles.details__text}>
							Ваши товары ({getTotalCountProducts(basket)})
							<span className={styles.details__price}>
								{getTotalPriceProducts(basket)} ₽
							</span>
						</p>
					</div>
					<div className={styles.details__total}>
						<p className={styles.details__text}>
							Итого к оплате:
							<span className={styles.details__totalPrice}>
								{getTotalPriceProducts(basket)} ₽
							</span>
						</p>
					</div>
					<Button
						type={"submit"}
						text={"Оформить заказ"}
						onClick={event => {
							event.preventDefault();

							onSubmit(
								userId,
								basket,
								getTotalCountProducts(basket),
								getTotalPriceProducts(basket),
							);
						}}
						isDisabled={submitButtonIsDisabled}
					/>
				</div>
			</Form>
		</div>
	);
};
