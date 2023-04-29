import { useState } from "react"
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { AiOutlineRight } from 'react-icons/ai'
import { TbTruckDelivery } from 'react-icons/tb'
import { FaRegUser } from "react-icons/fa";

import { Button } from "../../components/Button/Button"
import { Footer } from "../../components/Footer/Footer"
import { Header } from "../../components/Header/Header"
import { AddAdressModal } from "./components/addAdressModal/AddAdressModal"
import { AdressModal } from "./components/adressModal/AdressModal"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { dataService } from "../../services/dataService";
import { EmptyList } from "../../components/placeholders/EmptyList/EmptyList";
import { Notfound } from "../notfound/NotFound";
import { addItemToBasket } from "../../store/actions";

const ds = new dataService();

export const OrderPage = () => {
	const nav = useNavigate();
	const dispatch = useDispatch()
	const { userData, basket, token } = useSelector(state => state.mainReducer)

	const [open, setOpen] = useState(false);
	const [chooseAdress, setChooseAdress] = useState(false);
	const [addAdress, setAddAdress] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);
	console.log(basket)
	const handleSubmitOrder = () => {
		if (!selectedOption) {
			message.error('Выберите адрес')
		} else {
			const data = {
				first_name: userData.first_name,
				last_name: userData.last_name,
				'address': selectedOption,
				status: 0,
				user: userData.id,
				product: basket?.map((item, index) => item.id)
			}
			if (!token) {
				message.error('Войдите в аккаунт')
			} else {
				ds.addOrder(token, data).then(res => {
					basket.map((item, index) => (
						ds.deleteBaskets(token, item.basketId).then(res => {
							dispatch(addItemToBasket([]))
						})
					))
					setTimeout(() => {
						nav('/')
						message.success('Заказ оформлен. Скоро вам перезвонит наш менеджер')
					}, 1000)
				})
			}
		}
	}

	const handleChoice = () => {
		setChooseAdress(!chooseAdress)
	}

	const handleAddAdress = () => {
		setAddAdress(!addAdress)
	}

	if (token && userData && basket?.length > 0) {
		return (
			<div className="order">
				<Header />
				<AddAdressModal open={chooseAdress} closeModal={handleChoice} toggleModal={setAddAdress} setSelectedOption={setSelectedOption} />
				<AdressModal open={addAdress} closeModal={handleAddAdress} toggleModal={setChooseAdress} />
				<div className="container">
					<div className="order__title">
						<h2 className="section_title">Оформление заказа</h2>
						<Link to={'/basket'} className="order__link">Вернутся в корзину</Link>
					</div>
					<div className="order__content">
						<div className="order__content_main">
							<div className="order__info">
								<div className="order__info_part">
									<h3 className="order__info_part_title">Способ оплаты</h3>
									<form className="order__info_part_form">
										<div className="order__item">
											<div className="order__item_icon">
												<FaRegMoneyBillAlt />
											</div>
											<div className="order__item_text">
												Оплата при получении
											</div>
										</div>
									</form>
								</div>

								<div className="order__info_part">
									<h3 className="order__info_part_title">Способ получения</h3>
									<form className="order__info_part_form">
										<div className="item">
											{/* <input id="postm" type="radio" name="method">
													<label for="postm">
														<svg width="12" height="12" viewBox="0 0 12 12" fill="none"
															xmlns="http://www.w3.org/2000/svg">
															<path
															d="M2.5 3C2.5 3.01277 2.50511 3.08479 2.64604 3.20974C2.78639 3.33417 3.01801 3.46907 3.34713 3.5925C4.0017 3.83796 4.93951 4 6 4C7.06049 4 7.9983 3.83796 8.65287 3.5925C8.98199 3.46907 9.21361 3.33417 9.35396 3.20974C9.49489 3.08479 9.5 3.01277 9.5 3C9.5 2.98723 9.49489 2.91521 9.35396 2.79026C9.21361 2.66583 8.98199 2.53093 8.65287 2.4075C7.9983 2.16204 7.06049 2 6 2C4.93951 2 4.0017 2.16204 3.34713 2.4075C3.01801 2.53093 2.78639 2.66583 2.64604 2.79026C2.50511 2.91521 2.5 2.98723 2.5 3ZM1.5 3C1.5 2.59855 1.71875 2.27597 1.98264 2.042C2.24711 1.80752 2.60128 1.6192 2.99601 1.47118C3.78916 1.17374 4.85135 1 6 1C7.14865 1 8.21084 1.17374 9.00399 1.47118C9.39872 1.6192 9.75289 1.80752 10.0174 2.042C10.2813 2.27597 10.5 2.59855 10.5 3V5V7V9C10.5 9.40145 10.2813 9.72403 10.0174 9.958C9.75289 10.1925 9.39872 10.3808 9.00399 10.5288C8.21084 10.8263 7.14865 11 6 11C4.85135 11 3.78916 10.8263 2.99601 10.5288C2.60128 10.3808 2.24711 10.1925 1.98264 9.958C1.71875 9.72403 1.5 9.40145 1.5 9V7V5V3ZM2.5 5C2.5 5.01277 2.50511 5.08479 2.64604 5.20974C2.78639 5.33417 3.01801 5.46907 3.34713 5.59249C4.0017 5.83796 4.93951 6 6 6C7.06049 6 7.9983 5.83796 8.65287 5.59249C8.98199 5.46907 9.21361 5.33417 9.35396 5.20974C9.49489 5.08479 9.5 5.01277 9.5 5V4.3081C9.34545 4.3899 9.17869 4.46331 9.00399 4.52882C8.21084 4.82626 7.14865 5 6 5C4.85135 5 3.78916 4.82626 2.99601 4.52882C2.82131 4.46331 2.65455 4.3899 2.5 4.3081V5ZM2.5 6.3081V7C2.5 7.01277 2.50511 7.08479 2.64604 7.20974C2.78639 7.33417 3.01801 7.46907 3.34713 7.59249C4.0017 7.83796 4.93951 8 6 8C7.06049 8 7.9983 7.83796 8.65287 7.59249C8.98199 7.46907 9.21361 7.33417 9.35396 7.20974C9.49489 7.08479 9.5 7.01277 9.5 7V6.3081C9.34545 6.3899 9.17869 6.46331 9.00399 6.52882C8.21084 6.82626 7.14865 7 6 7C4.85135 7 3.78916 6.82626 2.99601 6.52882C2.82131 6.46331 2.65455 6.3899 2.5 6.3081ZM2.5 8.30809V9C2.5 9.01277 2.50511 9.08479 2.64604 9.20974C2.78639 9.33417 3.01801 9.46907 3.34713 9.59249C4.0017 9.83796 4.93951 10 6 10C7.06049 10 7.9983 9.83796 8.65287 9.59249C8.98199 9.46907 9.21361 9.33417 9.35396 9.20974C9.49489 9.08479 9.5 9.01277 9.5 9V8.30809C9.34545 8.3899 9.17869 8.46331 9.00399 8.52882C8.21084 8.82626 7.14865 9 6 9C4.85135 9 3.78916 8.82626 2.99601 8.52882C2.82131 8.46331 2.65455 8.3899 2.5 8.30809Z"
															fill="#3D5165" />
													</svg>

													Получить из почтамата</label> */}
										</div>
									</form>
									<div className="order__info_part_adress" >
										<TbTruckDelivery />
										<div className="order__body">
											<div className="order__body_name">
												<button onClick={handleChoice} className="order__body_name_but">
													<div className="order__body_name_adr">
														{
															selectedOption ? selectedOption : 'Нажмите, чтобы выбрать адрес'
														}
													</div>
													<div className="order__body_name_action">
														<AiOutlineRight color="blue" />
													</div>
												</button>
											</div>
										</div>
									</div>

									<div className="order__info_part_user" >
										<FaRegUser size={'15px'} />
										<div className="order__body">
											<span className="name">{userData?.first_name} {userData?.last_name}</span>
											<span className="tel">+{userData.phone_number}</span>
										</div>
									</div>
								</div>
							</div>

						</div>
						<div className="order__content_action">
							<div className="order__action_panel">
								{/* <button className="btn order__action_panel_btn">Оплатить онлайн</button> */}
								<Button
									text={'Оформить заказ'}
									variant={'primary'}
									type={'submit'}
									onClick={handleSubmitOrder}
								/>
								<div className="order__action_panel_policy">
									Нажимая на кнопку, вы соглашаетесь с Условиями обработки перс.
									данных, а также с Условиями продажи
								</div>
								<div className="order__action_panel_list">
									<div className="order__action_panel_list_item">
										<div className="order__all">
											Ваш заказ
										</div>
										<div className="order__all_value">{basket?.length} {basket?.length > 1 ? 'товара' : 'товар'}</div>
									</div>
									<div className="order__action_panel_list_item">
										<div className="order__price">
											{basket?.length > 1 ? 'Товары' : 'Товар'} ({basket?.length})
										</div>
										<div className="order__price_value">{basket.reduce((acc, obj) => acc + obj.price, 0)} ₽</div>
									</div>

									<div className="order__action_panel_list_item">
										<div className="order__dsc">
											Скидка
										</div>
										<div className="order__dsc_value">-{basket.reduce((acc, obj) => acc + obj.discount, 0)} ₽</div>
									</div>

									<div className="order__action_panel_list_item">
										<div className="order__delivery">
											Стоимость доставки <span>1 отправление</span>
										</div>
										<div className="order__delivery_value">Бесплатно</div>
									</div>

								</div>

								<div className="order__action_panel_total">
									<div className="order__name">Итого</div>
									<div className="order__price">
										<div className="order__new">{basket.reduce((acc, obj) => acc + obj.get_sale, 0)} ₽ </div>
										<div className="order__old">{basket.reduce((acc, obj) => acc + obj.price, 0)} ₽</div>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div >
				<Footer />
			</div >

		)
	} else if (basket?.length == 0) {
		return <Notfound />
	} else {
		return <Notfound user={'user'} />
	}
}