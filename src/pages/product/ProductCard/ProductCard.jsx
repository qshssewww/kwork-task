import { useEffect, useState } from "react";
import { Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdOutlineNotificationsNone } from 'react-icons/md';
import { FiPackage } from 'react-icons/fi';
import { GrLocation, GrCircleInformation } from 'react-icons/gr';
import { FaRegClock } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Radio } from 'antd';

import { Button } from "../../../components/Button/Button";
import { dataService } from "../../../services/dataService";
import { addItemToBasket, globaLoadState } from "../../../store/actions";
import { NavNext, NavPrev } from "../../../components/SliderNavigation/SliderNavigation";

const ds = new dataService();


export const ProductCard = ({ data }) => {
	const dispatch = useDispatch();
	const nav = useNavigate();
	const { basket, token, userData } = useSelector(state => state.mainReducer);

	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const [isBasketLoading, setIsBasketLoading] = useState(false);
	const [add, setAdd] = useState(false);
	const [dataOpt, setDataOpt] = useState({});
	const [curProd, setCurProd] = useState({});
	const [option, setOption] = useState('')


	const handleAddToBasket = () => {
		if (token && userData) {
			setIsBasketLoading(true)
			const basketPut = {
				'quantity': 1,
				'user': userData.id,
				'product': dataOpt.id
			}

			ds.addBaskets(token, basketPut).then(res => {
				const product = {
					basketId: res.id,
					id: dataOpt.id,
					quantity: 1,
					name: dataOpt.name,
					discount: dataOpt.discount,
					price: dataOpt.price,
					images: dataOpt.images,
					get_sale: dataOpt.get_sale
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
		const res = bs.findIndex((item) => item.id == dataOpt.id)

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

	const handleSizeChange = (event, item) => {
		setOption(event.target.value);

		if (event.target.value === item.size.name) {
			setDataOpt(item)
		}
		if (curProd?.variants_set?.length > 1) {
			curProd.variants_set.map((item, index) => {
			})
		}
	};

	const buttonStatus = () => {
		if (!dataOpt.is_published) {
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
					text={'Добавить в корзину'}
					variant={'primary'} />
			)
		}
	}

	useEffect(() => {
		// console.log(dataOpt)
		if (Object.keys(dataOpt).length === 0) {
			setDataOpt(data)
		}

		if (data?.product) {
			ds.getCurrentProduct(data.product.id).then(res => {
				setCurProd(res)
			})
			setOption(dataOpt?.size?.name)
		}
	}, [data, dataOpt])

	useEffect(() => {
		const inBasket = basket.find((item) => item.id == dataOpt.id)
		if (inBasket) {
			setAdd(true)
		} else {
			setAdd(false)
		}
	}, [basket, dataOpt, dispatch])

	// useEffect(() => {
	// 	if (curProd?.variants_set?.length > 1) {
	// 		curProd.variants_set.map((item, index) => {
	// 			if (option === item?.size?.name) {
	// 				console.log(data)
	// 				setDataOpt(data)
	// 			}
	// 		})
	// 	}
	// }, [curProd])


	return (
		<div className="ProductCard">
			<div className="ProductCard__head ProductCard__head_top">
				<div className="ProductCard__head_name">
					{
						dataOpt?.discount && dataOpt?.discount > 0 ? (
							<span className="ProductCard__head_dsc">
								-{dataOpt?.discount}%
							</span>
						) : null
					}

					<div className="ProductCard__head_el">
						{dataOpt?.title}
					</div>
				</div>
				<div className="ProductCard__head_bottom">
					<div className="ProductCard__head_bottom_rate"></div>
					<div className="ProductCard__head_bottom_info">
						<div className="ProductCard__head_bottom_info_item">
							<div className="ProductCard__head_bottom_info_item_name">Производитель: </div>
							<div className="ProductCard__head_bottom_info_item_value">{'12'}</div>
							{/* dataOpt?.product?.product_brand[0]?.brand_name */}
						</div>
						<div className="ProductCard__head_bottom_info_item">
							<span className="ProductCard__head_bottom_info_item_name">Артикул товара: </span>
							<span className="ProductCard__head_bottom_info_item_value">{dataOpt?.article}</span>
						</div>
					</div>
				</div>
			</div>
			<div className="ProductCard__body">
				<div className="ProductCard__body_gallery">
					<Swiper
						direction="vertical"
						watchSlidesProgress
						onSwiper={() => {
							dispatch(globaLoadState(false))
							return setThumbsSwiper
						}}
						modules={[Thumbs]}
						slidesPerView={5}
						spaceBetween={25}
						slideToClickedSlide
						className="ProductCard__body_gallery_thumbs"
					>
						{/* <NavNext vertical /> */}
						{/* <NavPrev vertical /> */}
						{
							dataOpt?.images?.length > 0 ? (
								dataOpt.images.map((item, index) => (
									<SwiperSlide style={{width: 54}} className="ProductCard__body_gallery_thumbs_sl" key={index}>
										<img src={`http://92.53.120.144${item.image_urls}`} alt="" />
									</SwiperSlide>
								))
							) : null
						}
					</Swiper>
					<Swiper
						modules={[Thumbs]}
						spaceBetween={15}
						thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
						className="ProductCard__body_gallery_slider">
						{
							dataOpt?.images?.length > 0 ? (
								dataOpt.images.map((item, index) => (
									<SwiperSlide className="ProductCard__body_gallery_slider_sl" key={index}>
										<img src={`http://92.53.120.144${item.image_urls}`} alt="" />
									</SwiperSlide>
								))
							) : null
						}
					</Swiper>
				</div>
				<div className="ProductCard__head ProductCard__head_bottom">
					<div className="ProductCard__head_name">
						{
							dataOpt?.discount && dataOpt?.discount > 0 ? (
								<span className="ProductCard__head_dsc">
								-{dataOpt?.discount}%
							</span>
							) : null
						}

						<div className="ProductCard__head_el">
							{dataOpt?.title}
						</div>
					</div>
				</div>
				<div className="ProductCard__body_content">
					<div className="ProductCard__body_content_action">
						<div className="ProductCard__body_content_action_selects">
							{
								curProd?.variants_set?.length > 1 ? (
									curProd.variants_set.map((item, index) => (
										<div className="ProductCard__body_content_action_selects_part" key={index}>
											{/* <	div className="ProductCard__body_content_action_selects_part_label">{item.title}</> */}
											{
												item?.size?.name.length > 0 ? (
													<Radio.Group value={option} onChange={(event) => handleSizeChange(event, item)} key={index}>
														<Radio.Button value={item?.size?.name}>{item?.size?.name}</Radio.Button>
													</Radio.Group>
												) : null
											}
										</div>
									))
								) : null
							}
						</div>
						<div className="ProductCard__body_content_action_chars">
							{
								dataOpt?.product?.chars?.length > 0 ? (
									dataOpt.product.chars.map((item) => (
										item.chars_option.map((itemOption, index) => (
											<div className="ProductCard__body_content_action_chars_item" key={index}>
												<div className="ProductCard__body_content_action_chars_item_name">
													{itemOption.name}
												</div>
												<div className="ProductCard__body_content_action_chars_item_value">
													{itemOption.value}
												</div>
											</div>
										))
									))
								) : null
							}
						</div>
						<div className="ProductCard__body_content_action_link">
							<a href="#">Перейти к описанию</a>
						</div>
					</div>
					<div className="ProductCard__body_content_info">
						<div className="ProductCard__body_content_info_main">
							<div className="ProductCard__body_content_info_main_price">
								<div className="ProductCard__body_content_info_main_price_main">{dataOpt?.get_sale} ₽</div>
								{
									dataOpt?.price != dataOpt?.get_sale ? (
										<div className="ProductCard__body_content_info_main_price_discount">{dataOpt?.price}</div>
									) : null
								}
							</div>
							<div className="ProductCard__body_content_info_main_ex">
								<div className="ProductCard__body_content_info_main_ex_note">
									<button><MdOutlineNotificationsNone />Узнать о снижении цены</button>
								</div>
							</div>
							<div className="ProductCard__body_content_info_main_action">
								{
									buttonStatus()
								}
								<div className="ProductCard__body_content_info_main_action_del">
									<FiPackage />Стандартная доставка
								</div>
							</div>
						</div>
						<div className="ProductCard__body_content_info_oc">
							<Button variant={'light'} disabled={true} onClick={() => nav('/order')} text={'Купить в один клик'} />
						</div>
						<div className="ProductCard__body_content_info_del">
							<h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: 15 }}>Информация о доставке</h3>
							<div className="ProductCard__body_content_info_del_item">
								<div className="ProductCard__body_content_info_del_item_el">
									<GrLocation style={{ marginRight: 5 }} />Москва, Московская обл.
								</div>
							</div>
							<div className="ProductCard__body_content_info_del_item">
								<div className="ProductCard__body_content_info_del_item_el">
									<GrCircleInformation style={{ marginRight: 5 }} />В наличии — осталось {dataOpt?.quantity} штук!
								</div>
							</div>
							<div className="ProductCard__body_content_info_del_item">
								<div className="ProductCard__body_content_info_del_item_el">
									<FaRegClock style={{ marginRight: 5 }} />Срок доставки уточним при оформлении заказа
								</div>
							</div>
						</div>
						<div className="ProductCard__body_content_info_faq">
							<h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: 15 }}>Часто задаваемые вопросы</h3>
							<div className="ProductCard__body_content_info_faq_list">
								<div className="ProductCard__body_content_info_faq_item">
									<Link to={'/help'}>Условия доставки</Link>
								</div>
								<div className="ProductCard__body_content_info_faq_item">
									<Link to={'/help'}>Возврат товаров</Link>
								</div>
								<div className="ProductCard__body_content_info_faq_item">
									<Link to={'/help'}>Способы оплаты</Link>
								</div>
								<div className="ProductCard__body_content_info_faq_item">
									<Link to={'/help'}>Возврат денег</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}