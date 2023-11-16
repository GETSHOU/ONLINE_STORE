import { Link } from "react-router-dom";
import styles from "./ProductInfo.module.scss";

export const ProductInfo = () => {
	return (
		<div className={styles.product}>
			<div className={styles.productImage}>
				<Link to="/">
					<img
						src="https://www.regard.ru/api/site/cacheimg/goods/1033571/358"
						alt="product_image"
					/>
				</Link>
			</div>
			<div className={styles.productInfo}>
				<p className={styles.productTextRow}>ID товара: 290875</p>
				<p className={styles.productTextRow}>
					<Link to="/" className={styles.productTitleLink}>
						Видеокарта NVIDIA GeForce RTX 4070 Ti ASUS 12Gb
						(ROG-STRIX-RTX4070TI-O12G-GAMING)
					</Link>
				</p>
				<p className={styles.productTextRow}>
					PCI-E 4.0, ядро - 2310 МГц, Boost - 2790 МГц, память - 12 Гб GDDR6X 21000 МГц,
					192 бит, 2xHDMI, 3xDisplayPort, подсветка, Retail
				</p>
			</div>
		</div>
	);
};
