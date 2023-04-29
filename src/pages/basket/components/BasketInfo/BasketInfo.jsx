import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "../../../../components/Button/Button";
import { globaLoadState } from "../../../../store/actions";
const _ = require('lodash');

export const BasketInfo = () => {
	const dispatch = useDispatch()

	const [productCount, setProductCount] = useState(0);
	const [getSum, setGetSum] = useState(0);
	const [sum, setSum] = useState(0);
	const [disc, setDisc] = useState(0);

	const nav = useNavigate();
	const { basket } = useSelector(state => state.mainReducer)

	useEffect(() => {
		setProductCount(_.sum(basket?.map(item => item.quantity)))
		setGetSum(_.sum(basket?.map(item => item.get_sale * item.quantity)))
		setSum(_.sum(basket?.map(item => item.price * item.quantity)))
		dispatch(globaLoadState(false))
	}, [basket])

	useEffect(() => {
		setDisc(sum - getSum)
	}, [getSum, sum])

	return (
		basket && basket.length > 0 ? (
			<div className="BasketInfo">
				<div className="BasketInfo__total">
					<div className="BasketInfo__total_get">{getSum}₽</div>
					<div className="BasketInfo__total_old">{sum}₽</div>
				</div>
				<div className="BasketInfo__main">
					<div className="BasketInfo__main_item">
						<div className="BasketInfo__main_item_name" style={{ fontWeight: 600 }}>Ваша корзина</div>
						<div className="BasketInfo__main_item_value" style={{ fontSize: 12 }}>{productCount} товара</div>
					</div>

					<div className="BasketInfo__main_item">
						<div className="BasketInfo__main_item_name">Товары ({productCount})</div>
						<div className="BasketInfo__main_item_value" style={{ fontWeight: 600 }}>{sum}₽</div>
					</div>

					<div className="BasketInfo__main_item">
						<div className="BasketInfo__main_item_name">Скидка</div>
						<div className="BasketInfo__main_item_value" style={{ color: '#FF9700', fontWeight: 600 }}>{disc}₽</div>
					</div>
				</div>
				<div className="BasketInfo__action">
					<Button
						onClick={() => nav('/order')}
						disabled={basket?.length > 0 ? false : true}
						text={'Перейти к оформлению'}
						variant={'primary'} />
				</div>
			</div>
		) : null
	)
}