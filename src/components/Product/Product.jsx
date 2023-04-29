import { Button } from "../Button/Button"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { IconButton } from "../IconButton/IconButton"
import { HeartFilled, HeartOutlined } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { addItemToBasket, addItemToFavorite } from "../../store/actions"
import { dataService } from "../../services/dataService"
import { message } from "antd"

const ds = new dataService();
const LOCAL_STORAGE = window.localStorage;

const selectBtnFromStatus = (status) => {
	switch (status) {
		case 0:
			return (
				<Button
					disabled={false}
					text={'Заказ собирается'}
					variant={'primary'}
				/>
			)
		case 1:
			return (
				<Button
					disabled={true}
					text={'Ожидает отправки'}
				/>
			)
		case 2:
			return (
				<Button
					disabled={false}
					text={'В пути'}
				/>
			)
		case 3:
			return (
				<Button
					disabled={true}
					text={'Доставлен'}
				/>
			)
		case 4:
			return (
				<Button
					disabled={true}
					text={'Отменен'}
				/>
			)
		default:
			return (
				<Button
					disabled={true}
					text={'Нет данных'}
				/>
			)

	}
}

export const Product = ({
	basketId,
	id,
	name,
	discount,
	price,
	get_sale,
	is_published,
	images,
	lk,
	prodStatus
}) => {

	const dispatch = useDispatch();
	const { basket, favorite, token, userData } = useSelector(state => state.mainReducer);

	const [add, setAdd] = useState(false);
	const [fav, setFav] = useState(false);
	const [resBasketId, setResBasketId] = useState(0);
	const [isBasketLoading, setIsBasketLoading] = useState(false);
	const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);

	const [textPerView, setTextPerView] = useState(0);
	const [textLength, setTextLength] = useState(24);

	useEffect(() => {
		function handleResize() {
			const windowWidth = window.innerWidth;
			if (windowWidth >= 1024) {
				setTextPerView(27);
				// setTextLength(42);
			} else if (windowWidth >= 425 && windowWidth <= 1024) {
				setTextPerView(16);
				setTextLength(42);
			} else {
				// setTextPerView(0);
				// setTextLength(42);
			}
		}
		
		handleResize()

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [])

	const handleAddToBasket = () => {
		if (token && userData) {
			setIsBasketLoading(true)
			const basketPut = {
				'quantity': 1,
				'user': userData.id,
				'product': id
			}

			ds.addBaskets(token, basketPut).then(res => {
				const product = {
					basketId: res.id,
					id: id,
					quantity: 1,
					name: name,
					discount: discount,
					price: price,
					images: images,
					get_sale: get_sale
				}

				const newBasket = [...basket, product]
				// LOCAL_STORAGE.setItem('', JSON.stringify(newBasket))
				dispatch(addItemToBasket(newBasket))
				setIsBasketLoading(false)
			})
		} else {
			message.info('Войдите в свой аккаунт')
		}
	}

	const handleRemoveFromBasket = () => {
		const bs = basket;
		const res = bs.findIndex((item) => item.id == id)

		if (basket) {
			if (res != -1) {
				setIsBasketLoading(true)
				const Idbasket = basket[res].basketId;
				ds.deleteBaskets(token, Idbasket).then(res => {
					// console.log(res)
				})
				let ur = basket;
				let pr = ur.splice(res, 1);
				const newBasket = [...ur];
				// LOCAL_STORAGE.setItem('', JSON.stringify(newBasket))
				dispatch(addItemToBasket(newBasket))
				setIsBasketLoading(false)
			}
		}
	}

	const handleAddToFavs = () => {
		if (token && userData) {
			setIsFavoriteLoading(true)
			const favoritePut = {
				'quantity': 1,
				'user': userData.id,
				'product': id
			}

			ds.addFavorites(token, favoritePut).then(res => {
				const product = {
					favoriteId: res.id,
					id: id,
					quantity: 1,
					name: name,
					discount: discount,
					price: price,
					images: images,
					get_sale: get_sale
				}

				const newBasket = [...favorite, product]
				// LOCAL_STORAGE.setItem('telier-favorite', JSON.stringify(newBasket))
				dispatch(addItemToFavorite(newBasket))
				setIsFavoriteLoading(false)
			})
		} else {
			message.info('Войдите в свой аккаунт')
		}
	}

	const handleRemoveFromFavs = () => {
		const bs = favorite;
		const res = bs.findIndex((item) => item.id == id)

		if (favorite) {
			if (res != -1) {
				setIsFavoriteLoading(true)
				const Idfavorite = favorite[res].favoriteId;

				let ur = favorite;
				let pr = ur.splice(res, 1);
				ds.deleteFavorites(token, Idfavorite).then(res => {
					// console.log(res)
				})
				const newFavs = [...ur];
				// LOCAL_STORAGE.setItem('telier-favorite', JSON.stringify(newFavs))
				dispatch(addItemToFavorite(newFavs))
				setIsFavoriteLoading(false)
			}
		}
	}

	const buttonStatus = () => {
		if (!is_published) {
			return (
				<Button
					disabled={true}
					text={'Нет в наличии'}
					variant={'primary'} />
			)
		}
		if (add) {
			return (
				<Button
					onClick={handleRemoveFromBasket}
					disabled={isBasketLoading}
					text={'Добавлено'}
					variant={'warning'} />
			)
		}
		if (!add) {
			return (
				<Button
					onClick={handleAddToBasket}
					disabled={isBasketLoading}
					text={'В корзину'}
					variant={'primary'} />
			)
		}
	}

	const favButtonStatus = () => {
		if (fav) {
			return (
				<IconButton
					variant={'like'}
					onClick={handleRemoveFromFavs}
					active={true}
					disabled={isFavoriteLoading}
					icon={<HeartFilled />} />
			)
		};

		if (!fav) {
			return (
				<IconButton
					variant={'like'}
					onClick={handleAddToFavs}
					active={false}
					disabled={isFavoriteLoading}
					icon={<HeartOutlined />} />
			)
		}
	}

	useEffect(() => {
		const inBasket = basket.find((item) => item.id == id)
		if (inBasket) {
			setAdd(true)
		} else {
			setAdd(false)
		}

		const inFavs = favorite.find((item) => item.id == id)
		if (inFavs) {
			setFav(true)
		} else {
			setFav(false)
		}

	}, [basket, favorite, id])

	return (
		<div className="Product">
			{
				discount != 0 ? (
					<div className="Product__promo">
						-{discount}%
					</div>
				) : null
			}
			{
				images ? (
					<Link to={`/product/${id}`} href='#' className="Product__img">
						<img src={`http://92.53.120.144${images}`} alt={name} />
					</Link>
				) : (
					null
				)
			}
			<div className="Product__body">
				<Link to={`/product/${id}`} className="Product__body_name" style={name?.length > `${textPerView}` ? { 'marginBottom': `0px` } : {}}>{name?.length < 42 ? name : `${name?.slice(0, 42)}...`}</Link>
				<div className="Product__body_price">
					<span className="Product__body_price_item Product__body_price_item-actual">{get_sale}₽</span>
					{
						discount != 0 ? (
							<span className="Product__body_price_item Product__body_price_item-old">{price}₽</span>
						) : null
					}
				</div>
				<div className="Product__body_action">
					<div className="Product__body_action_main">
						{
							lk ? selectBtnFromStatus(prodStatus) : buttonStatus()
						}
					</div>
					<div className="Product__body_action_ex">
						{
							lk ? null : favButtonStatus()
						}
					</div>
				</div>
			</div>
		</div>
	)
}