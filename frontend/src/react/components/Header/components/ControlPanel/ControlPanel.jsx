import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BiSolidUser } from "react-icons/bi";
import { IoMdCart } from "react-icons/io";
import { openModalForm } from "../../../../store/actions";
import { ConditionalRenderingModal } from "../../../Modal/components/ConditionalRenderingModal/ConditionalRenderingModal";
import styles from "./ControlPanel.module.scss";

export const ControlPanel = () => {
	const dispatch = useDispatch();
	const openAuthModal = () => dispatch(openModalForm("authorization"));

	return (
		<>
			<div className={styles.wrapper}>
				<button className={styles.control} onClick={openAuthModal}>
					<BiSolidUser className="icon iconControl" />
					<span className={styles.controlName}>Кабинет</span>
				</button>
				<Link to="/" className={styles.control}>
					<IoMdCart className="icon iconControl" />
					<span className={styles.controlName}>Корзина</span>
				</Link>
			</div>
			<ConditionalRenderingModal />
		</>
	);
};
