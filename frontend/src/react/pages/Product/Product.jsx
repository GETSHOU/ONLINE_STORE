import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setProduct, setProductIsLoading } from "../../store/actions";
import { productIsLoadingSelector, productSelector } from "../../store/selectors";
import { request } from "../../../utils";
import { ProductContent } from "./components/ProductContent/ProductContent";
import { Comments } from "../../components";
import styles from "./Product.module.scss";

export const Product = () => {
	const params = useParams();
	const product = useSelector(productSelector);
	const dispatch = useDispatch();
	const isLoading = useSelector(productIsLoadingSelector);

	useEffect(() => {
		dispatch(setProductIsLoading(true));

		request(`/api/products/${params.id}`)
			.then(response => {
				dispatch(setProduct(response.data));
			})
			.finally(() => {
				dispatch(setProductIsLoading(false));
			});
	}, [dispatch, params.id]);

	return (
		<>
			{isLoading ? null : (
				<div className={styles.wrapper}>
					<ProductContent product={product} />
					<Comments comments={product.comments} productId={product.id} />
				</div>
			)}
		</>
	);
};
