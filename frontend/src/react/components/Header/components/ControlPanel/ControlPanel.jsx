import { Link } from "react-router-dom";
import { BiSolidUser } from "react-icons/bi";
import { IoMdCart } from "react-icons/io";
import styles from "./ControlPanel.module.scss";

export const ControlPanel = () => {
	return (
		<div className={styles.wrapper}>
			<button className={styles.control}>
				<BiSolidUser className="icon iconControl" />
				<span className={styles.controlName}>Кабинет</span>
			</button>
			<Link to="/" className={styles.control}>
				<IoMdCart className="icon iconControl" />
				<span className={styles.controlName}>Корзина</span>
			</Link>
		</div>
	);
};
