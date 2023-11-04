import { HeaderInfo } from "./components/HeaderInfo/HeaderInfo";
import { HeaderTools } from "./components/HeaderTools/HeaderTools";
import { WithContainer } from "../../hoc";
import styles from "./Header.module.scss";

const HeaderInfoWithContainer = WithContainer(HeaderInfo);
const HeaderToolsWithContainer = WithContainer(HeaderTools);

export const Header = () => {
	return (
		<header className={styles.wrapper}>
			<div className={styles.top}>
				<HeaderInfoWithContainer />
			</div>
			<div className={styles.bottom}>
				<HeaderToolsWithContainer />
			</div>
		</header>
	);
};
