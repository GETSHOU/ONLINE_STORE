import { CardCategory } from "../../components";
import styles from "./Catalog.module.scss";

export const Catalog = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.cards}>
				<CardCategory categoryTitle={"Комплектующие для ПК"} />
				<CardCategory categoryTitle={"Периферия"} />
				<CardCategory categoryTitle={"Серверное оборудование"} />
			</div>
		</div>
	);
};
