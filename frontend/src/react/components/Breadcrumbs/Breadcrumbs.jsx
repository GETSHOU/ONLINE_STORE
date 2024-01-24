import { Crumb } from "./components/Crumb/Crumb";
import styles from "./Breadcrumbs.module.scss";

export const Breadcrumbs = () => {
	return (
		<nav className={styles.nav}>
			<ol className={styles.navList}>
				<Crumb link={"/"} name={"Главная"} />
				<Crumb link={"/"} name={"Каталог"} />
				<Crumb link={""} name={"Подкатегории"} />
			</ol>
		</nav>
	);
};
