import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCatalog } from "../../store/actions";
import { catalogSelector, catalogTitleSelector } from "../../store/selectors";
import { request } from "../../../utils";
import { CategoryCard, PageTitle } from "../../components";
import styles from "./Categories.module.scss";

export const Categories = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [dataNotExist, setDataNotExist] = useState(false);

	const categories = useSelector(catalogSelector);
	const catalogTitle = useSelector(catalogTitleSelector);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);

		request("/api/categories")
			.then(response => {
				if (!isLoading) {
					if (response.data.length === 0) {
						setDataNotExist(true);
						navigate("/categories-not-exist", { replace: true });

						return;
					}

					setDataNotExist(false);
					dispatch(setCatalog(response.data));
				}
			})
			.catch(e => console.log(e.message))
			.finally(() => {
				setIsLoading(false);
			});
	}, [navigate]);

	return (
		<div className={styles.wrapper}>
			<PageTitle title={catalogTitle} />
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
