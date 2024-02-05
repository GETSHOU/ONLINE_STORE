import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductAsync } from "../../store/actions";
import {
	productSelector,
	productErrorSelector,
	productLoadingStatusSelector,
} from "../../store/selectors";
import { ProductContent } from "./components/ProductContent/ProductContent";
import { Comments, PageTitle } from "../../components";
import styles from "./Product.module.scss";

export const Product = () => {
	const product = useSelector(productSelector);
	const serverError = useSelector(productErrorSelector);
	const loadingStatus = useSelector(productLoadingStatusSelector);

	const dispatch = useDispatch();
	const params = useParams();

	useEffect(() => {
		dispatch(getProductAsync(params.id));
	}, [dispatch, params.id]);

	return (
		<div className={styles.wrapper}>
			<PageTitle title={product.title} loadingStatus={loadingStatus} />
			<ProductContent product={product} loadingStatus={loadingStatus} />
			<Comments
				comments={product.comments}
				productId={product.id}
				productLoadingStatus={loadingStatus}
			/>
		</div>
	);
};
