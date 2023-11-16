import { BsCartXFill } from "react-icons/bs";
import { IoMdCart } from "react-icons/io";
import { Button } from "../../../../components";
import styles from "./EmptyCart.module.scss";

export const EmptyCart = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.message}>
				<div className={styles.messageRow}>
					<BsCartXFill className="icon iconEmptyCart" />
				</div>
				<div className={styles.messageRow}>
					<span className={styles.messageText}>В корзине пока ничего нет</span>
				</div>
				<div className={styles.messageRow}>
					<span className={styles.messageText}>
						Нажмите <IoMdCart className="icon iconControl" /> для добавления в корзину
					</span>
				</div>
				<div className={styles.messageRow}>
					<Button buttonLink="/catalog" text="Перейти в каталог"></Button>
				</div>
			</div>
		</div>
	);
};
