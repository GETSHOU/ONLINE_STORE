import { useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { changeNumberOfProducts } from "../../store/actions";
import { COUNTER_RULES } from "../../../constants";
import { ActionButton } from "../ActionButton/ActionButton";
import styles from "./CountSwitcher.module.scss";

export const CountSwitcher = ({ productId, productCount }) => {
	const [quantity, setQuantity] = useState(productCount);
	const [decreaseDisabled, setDecreaseDisabled] = useState(false);
	const [increaseDisabled, setIncreaseDisabled] = useState(false);

	const dispatch = useDispatch();
	const refCounter = useRef();

	useLayoutEffect(() => {
		COUNTER_RULES.MIN === quantity
			? setDecreaseDisabled(true)
			: setDecreaseDisabled(false);
		COUNTER_RULES.MAX === quantity
			? setIncreaseDisabled(true)
			: setIncreaseDisabled(false);
	}, [quantity]);

	const decreaseCounter = id => {
		const decreaseQuantity = quantity - 1;

		if (quantity > COUNTER_RULES.MIN) {
			setQuantity(decreaseQuantity);
			dispatch(changeNumberOfProducts(id, decreaseQuantity));
		}
	};

	const increaseCounter = id => {
		const increasedQuantity = quantity + 1;

		if (quantity < COUNTER_RULES.MAX) {
			setQuantity(increasedQuantity);
			dispatch(changeNumberOfProducts(id, increasedQuantity));
		}
	};

	const onChangeCounter = ({ target }) => {
		const value = Number(target.value);

		if (!isNaN(value)) {
			if (value <= COUNTER_RULES.MAX) {
				setQuantity(value);
			} else if (value >= COUNTER_RULES.MAX) {
				setQuantity(COUNTER_RULES.MAX);
			} else if (value < COUNTER_RULES.MIN) {
				setQuantity(COUNTER_RULES.MIN);
			} else {
				return;
			}
		}
	};

	const onBlurCounter = (currentValue, id) => {
		const value = Number(currentValue);
		const increasedQuantity = value + 1;

		if (value !== productCount) {
			if (value === 0) {
				setQuantity(COUNTER_RULES.MIN);
				dispatch(changeNumberOfProducts(id, increasedQuantity));
			}

			if (value !== 0) {
				setQuantity(value);
				dispatch(changeNumberOfProducts(id, quantity));
			}
		} else {
			return;
		}
	};

	const onFocusCounter = () => refCounter.current.select();
	const onKeyDownCounter = key => key === "Enter" && refCounter.current.blur();

	return (
		<div className={styles.wrapper}>
			<ActionButton
				icon={<FaMinus className="icon" />}
				isDisabled={decreaseDisabled}
				clickFunction={() => decreaseCounter(productId)}
			/>
			<input
				ref={refCounter}
				name="value"
				type="text"
				value={quantity}
				onBlur={({ target }) => onBlurCounter(target.value, productId)}
				onFocus={onFocusCounter}
				onChange={onChangeCounter}
				onKeyDown={({ key }) => onKeyDownCounter(key)}
				className={styles.input}
			/>
			<ActionButton
				icon={<FaPlus className="icon" />}
				isDisabled={increaseDisabled}
				clickFunction={() => increaseCounter(productId)}
			/>
		</div>
	);
};
