import { IoMdCart } from "react-icons/io";
import styles from "./ProductCard.module.scss";
import { Button } from "../../../../components";

export const ProductCard = () => {
	return (
		<li className={styles.card}>
			<div className={styles.cardImage}>
				<img
					src="https://www.regard.ru/api/site/cacheimg/goods/1033571/358"
					alt="product_image"
				/>
			</div>
			<div className={styles.cardContent}>
				<h4 className={styles.cardTitle}>
					Видеокарта NVIDIA GeForce RTX 4070 Ti ASUS 12Gb
					(ROG-STRIX-RTX4070TI-O12G-GAMING)
				</h4>
				<p className={styles.cardText}>
					PCI-E 4.0, ядро - 2310 МГц, Boost - 2790 МГц, память - 12 Гб GDDR6X 21000 МГц,
					192 бит, 2xHDMI, 3xDisplayPort, подсветка, Retail
				</p>
			</div>
			<div className={styles.cardActions}>
				<div className={styles.price}>999 999 &#x20bd;</div>
				<Button
					type="button"
					text="В корзину"
					icon={<IoMdCart className="icon iconButton" />}
				/>
			</div>
		</li>
	);
};
