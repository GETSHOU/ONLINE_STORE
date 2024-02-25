import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersAsync } from "../../store/actions";
import { ordersSelector, ordersLoadingStatusSelector } from "../../store/selectors";
import { EmptyData, PageTitle } from "../../components";
import { OrderPreviewSkeleton } from "./components/OrderPreviewSkeleton/OrderPreviewSkeleton";
import { Order } from "./components/Order/Order";
import styles from "./Orders.module.scss";

export const Orders = () => {
	const orders = useSelector(ordersSelector);
	const serverError = useSelector(
		({ user }) => user.serverMessages.orders.getOrdersError,
	);
	const serverSuccess = useSelector(
		({ user }) => user.serverMessages.orders.getOrdersSuccess,
	);
	const loadingStatus = useSelector(ordersLoadingStatusSelector);

	const params = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getOrdersAsync(params.id));
	}, [dispatch, params.id]);

	return (
		<div className={styles.wrapper}>
			<PageTitle title={"Мои заказы"} />
			<div className={styles.orders}>
				{!loadingStatus ? (
					!serverError ? (
						Array.isArray(orders) && (
							<>
								{orders.length !== 0 ? (
									<ul className={styles.orders__list}>
										{orders.map(
											({
												id,
												orderedAt,
												products,
												totalCount,
												totalPrice,
												publicOrderId,
											}) => {
												return (
													<Order
														key={id}
														products={products}
														orderedAt={orderedAt}
														totalCount={totalCount}
														totalPrice={totalPrice}
														publicOrderId={publicOrderId}
													/>
												);
											},
										)}
									</ul>
								) : (
									<EmptyData orders={!!orders} />
								)}
							</>
						)
					) : null
				) : (
					<ul className={styles.orders__list}>
						<OrderPreviewSkeleton inline={true} orders={3} />
					</ul>
				)}
			</div>
		</div>
	);
};
