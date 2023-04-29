import { useDispatch, useSelector } from "react-redux"
import { addItemToBasket, addItemToFavorite, updateToken, updateUserData } from "../../../../store/actions";
import { message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { authService } from "../../../../services/authService";
import { Button } from "../../../../components/Button/Button";
import { useState } from "react";

const navitems = [
	{
		label: 'Все',
	},
	{
		index: '1',
		label: 'Ожидают отправки'
	},
	{
		index: '2',
		label: 'Отправленные'
	},
	{
		index: '3',
		label: 'Завершенные'
	},
	{
		index: '4',
		label: 'Отмененные'
	}
]

const LOCAL_STORAGE = window.localStorage;
const as = new authService();

export const LkSideBar = ({ setOrdFilter }) => {
	const dispatch = useDispatch();
	const location = useLocation();
	const nav = useNavigate();

	const { token, userData } = useSelector(state => state.mainReducer)

	const [navSelected, setNavSelected] = useState('Все')
	const [logoutLoad, setLogoutLoad] = useState(false)

	const selectNavHandle = (label, index) => {
		if(index == 1) { 
			setOrdFilter(0)
		} else { 
			setOrdFilter(index)
		}
		setNavSelected(label)
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
				if (location.pathname.includes('/lk')) {
					nav('/', { replace: true })
				}
			} else {
				message.error('Произошла ошибка, повторите позже')
			}
		})
	}

	return (
		<div className="LkSidebar">
			<div className="LkSidebar__main">
				<div className="LkSidebar__avatar">
					{userData?.first_name?.slice(0, 1)}
				</div>
				<div className="LkSidebar__user">
					{userData?.first_name}
					<br></br>
					{userData?.last_name}
				</div>
				<div className="LkSidebar__logout">
					<Button
						onClick={handleLogout}
						load={logoutLoad}
						text={'Выйти'}
						variant={'danger'}
					/>
				</div>
			</div>
			<div className="LkSidebar__nav">
				{
					navitems.map((item, index) => (
						<div
							key={index}
							onClick={() => selectNavHandle(item.label, item.index)}
							className={"LkSidebar__nav_item" + (navSelected == item.label ? ' active ' : '')}>
							{item.label}
						</div>
					))
				}

			</div>
		</div>
	)
}