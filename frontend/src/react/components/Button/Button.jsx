import { Link } from "react-router-dom";
import { BUTTON_SIZE } from "../../../constants";
import styles from "./Button.module.scss";

export const Button = ({ buttonLink, type, text, icon, size, onClick, ...props }) => {
	const baseClassName = styles.button;
	const iconClassName = icon ? styles.buttonIcon : "";
	const sizeClassName = size === BUTTON_SIZE.LARGE ? styles.buttonLarge : "";

	const buttonLinkTrimmed = buttonLink && buttonLink.trim();

	return (
		<>
			{!buttonLink ? (
				<button
					type={type}
					className={`${baseClassName} ${sizeClassName} ${iconClassName}`}
					onClick={onClick}
					{...props}
				>
					<span className={styles.buttonText}>{text}</span>
					{icon}
				</button>
			) : (
				<Link
					to={buttonLinkTrimmed}
					className={`${baseClassName} ${sizeClassName} ${iconClassName}`}
				>
					<span className={styles.buttonText}>{text}</span>
					{icon}
				</Link>
			)}
		</>
	);
};
