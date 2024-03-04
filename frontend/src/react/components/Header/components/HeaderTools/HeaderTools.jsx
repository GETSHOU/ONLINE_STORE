import { HiBars3BottomLeft } from "react-icons/hi2";
import { BUTTON_SIZE } from "../../../../../constants";
import { SearchInput } from "../../../SearchInput/SearchInput";
import { ControlPanel } from "../ControlPanel/ControlPanel";
import { Logo } from "../Logo/Logo";
import { Button } from "../../../Button/Button";
import styles from "./HeaderTools.module.scss";

export const HeaderTools = ({
	searchQuery,
	shouldSearch,
	setSearchQuery,
	setShouldSearch,
	setSearchCompleted,
}) => {
	return (
		<div className={styles.wrapper}>
			<Logo />
			<div className={styles.tools}>
				<Button
					buttonLink="/categories"
					size={BUTTON_SIZE.LARGE}
					text="Каталог"
					icon={<HiBars3BottomLeft className="icon iconButton" />}
				/>
				<SearchInput
					searchQuery={searchQuery}
					shouldSearch={shouldSearch}
					setSearchQuery={setSearchQuery}
					setShouldSearch={setShouldSearch}
					setSearchCompleted={setSearchCompleted}
				/>
				<ControlPanel />
			</div>
		</div>
	);
};
