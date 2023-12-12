import { useEffect, useState } from "react";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { request } from "../../../utils";
import { CategoryCard } from "../../components";
import styles from "./Subcategories.module.scss";

export const Subcategories = () => {
	const [subcategories, setSubcategories] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [dataNotExist, setDataNotExist] = useState(false);

	const params = useParams();
	const navigate = useNavigate();

	const isSubcategoriesPage = !!useMatch(`/categories/:id/subcategories`);

	useEffect(() => {
		setIsLoading(true);

		request(`/api/categories/${params.id}/subcategories`)
			.then(response => {
				if (!isLoading) {
					if (response.data.length === 0) {
						setDataNotExist(true);
						navigate("/subcategories-not-exist", { replace: true });

						return;
					}

					setDataNotExist(false);
					setSubcategories(response.data);
				}
			})
			.catch(e => console.log(e.message))
			.finally(() => {
				setIsLoading(false);
			});
	}, [navigate, params.id]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.cards}>
				{!isLoading
					? !dataNotExist && (
							<>
								{subcategories.map(({ id, parent, title }) => {
									return (
										<CategoryCard
											key={id}
											id={id}
											parentTitle={parent}
											categoryTitle={title}
											isSubcategoriesPage={isSubcategoriesPage}
										/>
									);
								})}
							</>
					  )
					: null}
			</div>
		</div>
	);
};
