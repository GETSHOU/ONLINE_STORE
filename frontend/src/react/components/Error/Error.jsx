import { BUTTON_SIZE } from "../../../constants";
import { Button } from "../Button/Button";
import styles from "./Error.module.scss";

export const Error = ({ error }) => {
	return (
		error && (
			<div className={styles.wrapper}>
				<div className={styles.error}>
					<h1 className={styles.errorTitle}>Ошибка!</h1>
					<div className={styles.errorText}>{error}</div>
					<Button buttonLink="/" text="На главную" size={BUTTON_SIZE.LARGE} />
				</div>
			</div>
		)
	);
};
