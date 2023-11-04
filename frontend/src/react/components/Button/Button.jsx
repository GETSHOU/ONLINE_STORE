import { Link } from "react-router-dom";
import { BUTTON_SIZE } from "../../../constants";
import styles from "./Button.module.scss";

export const Button = ({ buttonLink, text, icon, size }) => {
	const baseClassName = styles.button;
	const iconClassName = icon ? styles.buttonIcon : "";
	const sizeClassName = size === BUTTON_SIZE.LARGE ? styles.buttonLarge : "";

	return (
		<>
			{!buttonLink.trim() ? (
				<button
					type="button"
					className={`${baseClassName} ${sizeClassName} ${iconClassName}`}
				>
					<span className={styles.buttonText}>{text}</span>
					{icon}
				</button>
			) : (
				<Link
					to={buttonLink}
					className={`${baseClassName} ${sizeClassName} ${iconClassName}`}
				>
					<span className={styles.buttonText}>{text}</span>
					{icon}
				</Link>
			)}
		</>
	);
};
