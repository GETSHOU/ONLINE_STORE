import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../../../utils";
import { CategoryCard } from "../../components";
import styles from "./Categories.module.scss";

export const Categories = () => {
	const [categories, setCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [dataNotExist, setDataNotExist] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);

		request("/api/categories")
			.then(response => {
				if (!isLoading) {
					if (!response.data) {
						setDataNotExist(true);
						navigate("/categories-not-exist", { replace: true });

						return;
					}

					setDataNotExist(false);
					setCategories(response.data);
				}
			})
			.catch(e => console.log(e.message))
			.finally(() => {
				setIsLoading(false);
			});
	}, [navigate]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.cards}>
				{!isLoading
					? !dataNotExist && (
							<>
								{categories.map(({ id, title }) => (
									<CategoryCard key={id} id={id} categoryTitle={title} />
								))}
							</>
					  )
					: null}
			</div>
		</div>
	);
};
