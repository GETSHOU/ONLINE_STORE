import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setProduct, setProductIsLoading } from "../../store/actions";
import { productIsLoadingSelector, productSelector } from "../../store/selectors";
import { request } from "../../../utils";
import { ProductContent } from "./components/ProductContent/ProductContent";
import { Comments } from "../../components";
import styles from "./Product.module.scss";

export const Product = () => {
	const isLoading = useSelector(productIsLoadingSelector);
	const [dataNotExist, setDataNotExist] = useState(false);

	const dispatch = useDispatch();
	const product = useSelector(productSelector);
	const params = useParams();

	useEffect(() => {
		dispatch(setProductIsLoading(true));

		request(`/api/products/${params.id}`)
			.then(response => {
				if (!isLoading) {
					if (!response.data) {
						setDataNotExist(true);
						// navigate("/product-not-exist", { replace: true });

						return;
					}

					setDataNotExist(false);
					dispatch(setProduct(response.data));
				}
			})
			.finally(() => {
				dispatch(setProductIsLoading(false));
			});
	}, [dispatch, params.id]);

	return (
		<>
			{!isLoading
				? !dataNotExist && (
						<>
							<div className={styles.wrapper}>
								<ProductContent product={product} />
								<Comments comments={product.comments} productId={product.id} />
							</div>
						</>
				  )
				: null}
		</>
	);
};
