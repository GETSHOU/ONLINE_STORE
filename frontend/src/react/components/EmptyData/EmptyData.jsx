import { FaBagShopping, FaCartShopping } from "react-icons/fa6";
import { Button } from "../Button/Button";
import styles from "./EmptyData.module.scss";

export const EmptyData = ({ basket, orders }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.message}>
				<div className={styles.messageRow}>
					{basket && <FaCartShopping className="icon iconEmptyData" />}
					{orders && <FaBagShopping className="icon iconEmptyData" />}
				</div>
				<div className={styles.messageRow}>
					<span className={styles.messageText}>
						{basket && `В корзине ничего нет`}
						{orders && `В списке заказов ничего нет`}
					</span>
				</div>
				<div className={styles.messageRow}>
					<span className={styles.messageText}>
						{basket && (
							<>
								Нажмите <FaCartShopping className="icon iconControl" /> для добавления в
								корзину
							</>
						)}
					</span>
				</div>
				<div className={styles.messageRow}>
					<Button buttonLink="/categories" text="Перейти в каталог"></Button>
				</div>
			</div>
		</div>
	);
};
