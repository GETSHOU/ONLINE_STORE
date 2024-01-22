import { useDispatch, useSelector } from "react-redux";
import { IoMdCart } from "react-icons/io";
import { addProductInBasket, changeNumberOfProducts } from "../../store/actions";
import { basketSelector } from "../../store/selectors";
import { COUNTER_RULES } from "../../../constants";
import { Button } from "../Button/Button";
import styles from "./ProductDetails.module.scss";

export const ProductDetails = ({ product }) => {
	const basket = useSelector(basketSelector);
	const dispatch = useDispatch();

	const handleAddToBasket = id => {
		const foundedProduct = basket.find(data => data.product.id === id);

		if (!foundedProduct) {
			dispatch(addProductInBasket({ product, productCount: 1 }));
		} else {
			if (foundedProduct.productCount < COUNTER_RULES.MAX) {
				dispatch(changeNumberOfProducts(id, foundedProduct.productCount + 1));
			}
		}
	};

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
					onClick={() => handleAddToBasket(product.id)}
				/>
			</div>
		</div>
	);
};
