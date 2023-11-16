import { useEffect, useState } from "react";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { ActionButton } from "../ActionButton/ActionButton";
import styles from "./CountSwitcher.module.scss";

export const CountSwitcher = ({ id }) => {
	const countId = id;

	const [count, setCount] = useState(1);
	const [decreaseIsDisabled, setDecreaseIsDisabled] = useState(false);
	const [increaseIsDisabled, setIncreaseIsDisabled] = useState(false);

	const decreaseValue = () => {
		setCount(count - 1);
	};

	const increaseValue = () => {
		setCount(count + 1);
	};

	const handleChange = target => {
		setCount(target.value);
	};

	return (
		<div className={styles.wrapper}>
			<ActionButton
				icon={<FaMinus className="icon" />}
				isDisabled={decreaseIsDisabled}
				clickFunction={decreaseValue}
			/>
			<input
				className={styles.input}
				type="text"
				name="value"
				value={count}
				onChange={({ target }) => handleChange(target)}
			/>
			<ActionButton
				icon={<FaPlus className="icon" />}
				isDisabled={increaseIsDisabled}
				clickFunction={increaseValue}
			/>
		</div>
	);
};
