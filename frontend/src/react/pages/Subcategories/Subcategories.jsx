import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadCategoryAsync } from "../../store/actions";
import { categorySelector } from "../../store/selectors";
import { request } from "../../../utils";
import { CategoryCard, PageTitle } from "../../components";
import styles from "./Subcategories.module.scss";

export const Subcategories = () => {
	const [subcategories, setSubcategories] = useState([]);
	const dispatch = useDispatch();
	const params = useParams();

	useEffect(() => {}, []);

	return (
		<div className={styles.wrapper}>
			<PageTitle title="Подкатегория" />
			<div className={styles.cards}>
				{/* {subcategories.map(({ id, title }) => {
					return <CategoryCard key={id} id={id} categoryTitle={title} />;
				})} */}
			</div>
		</div>
	);
};
