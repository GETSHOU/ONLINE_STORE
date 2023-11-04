import { BsFillPhoneVibrateFill, BsHeadset } from "react-icons/bs";
import { FaLuggageCart } from "react-icons/fa";
import styles from "./HeaderInfo.module.scss";

export const HeaderInfo = () => {
	return (
		<div className={styles.info}>
			<div className={styles.infoItem}>
				<BsFillPhoneVibrateFill className="icon iconHeaderInfo" />
				<span className={styles.infoText}>
					<span className="highlightedText">+7 495</span> 999-99-99 |
					<span className="highlightedText"> 8 800</span> 888-88-88
				</span>
			</div>
			<div className={styles.infoItem}>
				<BsHeadset className="icon iconHeaderInfo" />
				<span className={styles.infoText}>
					<span className="highlightedText">Консультация</span> - с 09:30 до 20:00
				</span>
			</div>
			<div className={styles.infoItem}>
				<FaLuggageCart className="icon iconHeaderInfo" />
				<span className={styles.infoText}>
					<span className="highlightedText">Пункт выдачи</span> - с 10:00 до 20:00
				</span>
			</div>
		</div>
	);
};
