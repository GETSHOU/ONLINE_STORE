import { HeaderInfo } from "./components/HeaderInfo/HeaderInfo";
import { HeaderTools } from "./components/HeaderTools/HeaderTools";
import { WithContainer } from "../../hoc";
import styles from "./Header.module.scss";

const HeaderInfoWithContainer = WithContainer(HeaderInfo);
const HeaderToolsWithContainer = WithContainer(HeaderTools);

export const Header = ({
	isAllowedRoles,
	searchQuery,
	shouldSearch,
	setSearchQuery,
	setShouldSearch,
	startDelayedSearch,
	setSearchCompleted,
}) => {
	return (
		<header className={styles.wrapper}>
			<div className={styles.top}>
				<HeaderInfoWithContainer isAllowedRoles={isAllowedRoles} />
			</div>
			<div className={styles.bottom}>
				<HeaderToolsWithContainer
					isAllowedRoles={isAllowedRoles}
					searchQuery={searchQuery}
					shouldSearch={shouldSearch}
					setSearchQuery={setSearchQuery}
					setShouldSearch={setShouldSearch}
					startDelayedSearch={startDelayedSearch}
					setSearchCompleted={setSearchCompleted}
				/>
			</div>
		</header>
	);
};
