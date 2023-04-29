import { useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Counter } from "../../../../components/Counter/Counter";
import { dataService } from "../../../../services/dataService";
import { addItemToBasket } from "../../../../store/actions";
import { Link } from "react-router-dom";

const ds = new dataService();
const LOCAL_STORAGE = window.localStorage;

export const BasketItem = ({
	basketId,
	id,
	name,
	discount,
	price,
	get_sale,
	quantity,
	images,
	selectItem
}) => {

	const { token, basket, userData } = useSelector(state => state.mainReducer)
	const dispatch = useDispatch();

	const [totalGetPrice, setTotalGetPrice] = useState(0)
	const [totalPrice, setTotalPrice] = useState(0);

	const deleteItem = () => {
		const product = {
			basketId: basketId,
			id: id,
			quantity: quantity - 1,
			name: name,
			discount: discount,
			price: price,
			images: images,
			get_sale: get_sale
		}
		const index = basket.findIndex(item => item.id == id);
		const pr = basket;
		const rm = pr.splice(index, 1);
		const newBasket = [...pr];
		// LOCAL_STORAGE.setItem('telier-basket', JSON.stringify(newBasket))
		dispatch(addItemToBasket(newBasket))

		ds.deleteBaskets(token, basketId).then(res => {
			// console.log(res)
		})
	}

	const addFunc = () => {
		const product = {
			basketId: basketId,
			id: id,
			quantity: quantity + 1,
			name: name,
			discount: discount,
			price: price,
			images: images,
			get_sale: get_sale
		}
		const basketPut = {
			'quantity': quantity + 1,
			'user': userData.id,
			'product': id
		}

		const index = basket.findIndex(item => item.id == id);
		const pr = basket;
		const rm = pr.splice(index, 1, product);
		const newBasket = [...pr];
		// LOCAL_STORAGE.setItem('telier-basket', JSON.stringify(newBasket))
		dispatch(addItemToBasket(newBasket))
		ds.putBaskets(token, basketId, basketPut).then(res => {
			// console.log(res)
		})
	}

	const removeFunc = () => {
		const product = {
			basketId: basketId,
			id: id,
			quantity: quantity - 1,
			name: name,
			discount: discount,
			price: price,
			images: images,
			get_sale: get_sale
		}
		const basketPut = {
			'quantity': quantity - 1,
			'user': userData.id,
			'product': id
		}
		const index = basket.findIndex(item => item.id == id);
		const pr = basket;
		const rm = pr.splice(index, 1, product);
		const newBasket = [...pr];
		// LOCAL_STORAGE.setItem('telier-basket', JSON.stringify(newBasket))
		dispatch(addItemToBasket(newBasket));
		ds.putBaskets(token, basketId, basketPut).then(res => {
			// console.log(res)
		})
	}

	useEffect(() => {
		setTotalGetPrice(quantity * get_sale);
		setTotalPrice(quantity * price);
	}, [price, quantity, get_sale])


	return (
		<div className="BasketItem">
			<Link to={`/product/${id}`}>
				<div className="BasketItem__img">
					<img src={`http://92.53.120.144${images}`} alt="" />
				</div>
			</Link>
			<div className="BasketItem__body">
				<div className="BasketItem__body_main">
					<div className="BasketItem__body_main_name">
						{
							discount != 0 ? (
								<div className="BasketItem__body_main_name_discount">{discount}%</div>
							) : null
						}

						{name}
					</div>
					<div className="BasketItem__body_main_price">
						<div className="BasketItem__body_main_price_get">{totalGetPrice}</div>
						{
							get_sale != price ? (
								<div className="BasketItem__body_main_price_old">{totalPrice}₽</div>
							) : null
						}
					</div>
				</div>
				<div className="BasketItem__body_action">
					<button onClick={deleteItem} className="BasketItem__body_action_delete">
						<BsFillTrashFill style={{ marginRight: 10 }} /> Удалить
					</button>
				</div>
			</div>
			<div className="BasketItem__counter">
				<Counter addFunc={addFunc} removeFunc={removeFunc} value={quantity} />
			</div>
		</div>
	)
}