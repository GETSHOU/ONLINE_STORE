import { useEffect, useState } from "react";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryTitle, setSubcategories } from "../../store/actions";
import { categoryTitleSelector, subcategoriesSelector } from "../../store/selectors";
import { getCardTitle, request } from "../../../utils";
import { CategoryCard, PageTitle } from "../../components";
import styles from "./Subcategories.module.scss";

export const Subcategories = () => {
	const subcategories = useSelector(subcategoriesSelector);
	const [isLoading, setIsLoading] = useState(false);
	const [dataNotExist, setDataNotExist] = useState(false);

	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const isSubcategoriesPage = !!useMatch(`/categories/:id`);
	const categoryTitle = useSelector(categoryTitleSelector);

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
					dispatch(setSubcategories(response.data));
					dispatch(setCategoryTitle(getCardTitle(response.data)));
				}
			})
			.catch(e => console.log(e.message))
			.finally(() => {
				setIsLoading(false);
			});
	}, [dispatch, navigate, params.id]);

	return (
		<div className={styles.wrapper}>
			<PageTitle title={categoryTitle} />
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
