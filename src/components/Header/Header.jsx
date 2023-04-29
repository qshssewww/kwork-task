/* eslint-disable no-unused-expressions */
import { EnvironmentOutlined, PhoneOutlined, AppstoreOutlined, ShoppingCartOutlined, HeartOutlined, UserOutlined, CloseOutlined } from "@ant-design/icons"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import useModal from "antd/es/modal/useModal";
import { Button, Dropdown, Menu, message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { Search } from '../Search/Search';
import { Category } from "../Category/Category";
import logo from '../../assets/Logo.svg'
import { authService } from "../../services/authService";
import { updateToken, updateUserData, addItemToBasket, addItemToFavorite } from "../../store/actions";
import { Login } from '../Auth/Login/Login';
import { SignUp } from '../Auth/SignUp/SignUp';
import { dataService } from "../../services/dataService";
import { CodeSend } from "../CodeSend/CodeSend";
// import {  } from "";

const _ = require('lodash');
const LOCAL_STORAGE = window.localStorage;

const as = new authService();

const ds = new dataService();


export const Header = () => {

	const nav = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation()
	const [category, setCategory] = useState(false)
	const { visible, hideModal } = useModal();
	const { token, userData, basket, favorite } = useSelector(state => state.mainReducer)
	const [login, setLogin] = useState(false);
	const [signup, setSignup] = useState(false);
	const [code, setCode] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [basketCount, setBasketCount] = useState(0);
	const [phoneNumber, setPhoneNumber] = useState(0);
	const [logOrSign, setLogOrSign] = useState(true);
	const [userMobil, setUserMobil] = useState(false);

	const catalogHandle = () => {
		setCategory(!category)
	}

	const showUserModal = () => {
		setShowModal(!showModal);
	}

	const handleSignup = () => {
		setSignup(!signup)
	}

	const handleCode = () => {
		setCode(!code)
	}

	const handleLogin = () => {
		setLogin(!login)
	}

	const handleLogout = () => {
		as.logout(token).then(async res => {
			if (res.status == 204) {
				LOCAL_STORAGE.removeItem('token-telier')
				LOCAL_STORAGE.removeItem('user-telier')
				dispatch(updateToken(null))
				dispatch(updateUserData({}))
				dispatch(addItemToBasket([]))
				dispatch(addItemToFavorite([]))
				message.info('Вы вышли из аккаунта')
				hideModal;
				if (location.pathname.includes('/lk')) {
					nav('/', { replace: true })
				}
			} else {
				message.error('Произошла ошибка, повторите позже')
			}
		})
	}

	const items = [
		{
			label: (
				<Link to={'/lk'} href='#'>Профиль</Link>
			),
			key: '1',
		},
		{
			label: (
				<button onClick={handleLogout}>Выйти</button>
			),
			key: '2',
		}];
	const menuProps = {
		items,
	};

	useEffect(() => {
		if (token && userData) {
			ds.getBaskets(token).then(res => {

				const prod = [];
				res.map((item, index) => {
					const product = {
						basketId: item.id,
						id: item.product.id,
						quantity: item.quantity,
						name: item.product.title,
						discount: item.product.discount,
						price: item.product.price,
						images: item.product.images[0].image_urls,
						get_sale: item.product.get_sale
					}

					prod.push(product)
					dispatch(addItemToBasket(prod))
					// LOCAL_STORAGE.setItem('', JSON.stringify(prod))

					// const basketPut = {
					// 	'quantity': 1,
					// 	'user': userData.id,
					// 	'product': item.product.id
					// }

					// 	ds.addBaskets(token, basketPut).then(res => {
					// 		console.log(res)
					// })

				})
			});

			ds.getFavorites(token).then(res => {

				const favs = [];
				res.map((item, index) => {

					const product = {
						favoriteId: item.id,
						id: item.product.id,
						name: item.product.title,
						discount: item.product.discount,
						price: item.product.price,
						get_sale: item.product.get_sale,
						is_published: item.product.is_published,
						images: item.product.images[0].image_urls,
					}
					ds.getCurrentProduct(item.product.product.id).then(restwo => {
						// console.log(restwo)
					})
					favs.push(product)
					dispatch(addItemToFavorite(favs))
				})
			})
		}
	}, [userData, token, dispatch])

	useEffect(() => {
		setBasketCount(_.sum(basket.map(item => item.quantity)))
	}, [basket])

	useEffect(() => {
		function handleResize() {
			const windowWidth = window.innerWidth;
			if (windowWidth >= 1024) {
				setUserMobil(false);
			} else if (windowWidth >= 425 && windowWidth <= 1024) {
				setUserMobil(true);
			} else {
				setUserMobil(true);
			}
		}

		handleResize();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [])

	return (
		<header className="Header">
			<Login open={login} closeHandle={handleLogin} toggleAuth={setSignup} setLogOrSign={setLogOrSign} />
			<SignUp open={signup} closeHandle={handleSignup} toggleAuth={logOrSign ? setCode : setLogin} setPhoneNumber={setPhoneNumber} setLogOrSign={setLogOrSign} logOrSign={logOrSign} />
			<CodeSend open={code} closeHandle={handleCode} toggleAuth={setLogin} setPhoneNumber={phoneNumber} />
			<div className="container">
				<div className="Header__in">
					<Category active={category} setCategory={setCategory} />
					<div className="Header__top">
						<div className="Header__top_action">
							<div className="Header__top_action_city Header__top_action_item">
								<span className="Header__top_action_item_icon">
									<EnvironmentOutlined />
								</span>
								<span className="Header__top_action_item_text">Москва</span>
							</div>
							<a href="tel:" className="Header__top_action_tel Header__top_action_item">
								<span className="Header__top_action_item_icon">
									<PhoneOutlined />
								</span>
								<span className="Header__top_action_item_text">
									+79260278489
								</span>
							</a>
						</div>
						<div className="Header__top_nav">
							<ul className="Header__top_nav_list">
								<li className="Header__top_nav_item">
									<Link to={'/about'}>Контакты</Link>
								</li>
								<li className="Header__top_nav_item">
									<Link to={'/help'}>Помощь</Link>
								</li>
								<li className="Header__top_nav_item">
									<Link to={'/about'}>О нас</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="Header__main">
						<div className="Header__main_lk">
							<Link to={'/'} className="Header__main_lk_logo">
								<img src={logo} alt='Telier' ></img>
							</Link>
							<div className="Header__main_lk_catalog">
								<button className="Header__main_lk_catalog_btn" onClick={catalogHandle}>
									<span className="Header__main_lk_catalog_btn_icon">
										{
											category ? (
												<CloseOutlined />
											) : (
												<AppstoreOutlined />
											)
										}
									</span>
									<span className="Header__main_lk_catalog_btn_text">
										Каталог
									</span>
								</button>
							</div>
						</div>
						<div className="Header__main_search">
							<Search />
						</div>
						<div className="Header__main_action">
							<Link to={'/basket'} className="Header__main_action_item">
								{
									basketCount ? (
										<div className="Header__main_action_item_not">
											{basketCount}
										</div>
									) : null
								}
								<span className="Header__main_action_item_icon"><ShoppingCartOutlined /></span>
								<span className="Header__main_action_item_text">Корзина</span>
							</Link>
							<Link to={'/favorite'} className="Header__main_action_item">
								{
									favorite?.length > 0 ? (
										<div className="Header__main_action_item_not" style={{ backgroundColor: '#FF9700' }}>
											{favorite.length}
										</div>
									) : null
								}
								<span className="Header__main_action_item_icon"><HeartOutlined /></span>
								<span className="Header__main_action_item_text">Избранное</span>
							</Link>

							<Modal width={350} onCancel={hideModal} className='modal Header__um' open={showModal}>
								<ul className="Header__um_list">
									<li className="Header__um_item" onClick={() => nav('/lk')}>
										Личный кабинет
									</li>
									<li className="Header__um_item">
										Первый Пункт
									</li>
									<li className="Header__um_item Header__um_item-danger" onClick={handleLogout}>
										Личный кабинет
									</li>
								</ul>
							</Modal>

							{
								userData && token ? (
									<button className="Header__main_action_item logged">
										{
											!userMobil ? (
												<Dropdown menu={menuProps} placement="bottom" arrow={{ pointAtCenter: true }}>
													<span className="Header__main_action_item_center">
														<span className="Header__main_action_item_icon"><UserOutlined /></span>
														<span className="Header__main_action_item_text">{userData.first_name}</span>
													</span>
												</Dropdown>
											) : (
												<Link to={'/lk'}><span className="Header__main_action_item_center">
													<span className="Header__main_action_item_icon"><UserOutlined /></span>
													<span className="Header__main_action_item_text">{userData.first_name}</span>
												</span></Link>
											)
										}
									</button>
								) : (
									<button onClick={handleLogin} className="Header__main_action_item">
										<span className="Header__main_action_item_icon"><UserOutlined /></span>
										<span className="Header__main_action_item_text">Войти</span>
									</button>
								)
							}
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}