import { useState, useEffect } from 'react';
import { HiOutlineInbox } from 'react-icons/hi';
import { AdressModal } from '../../../../../order/components/adressModal/AdressModal';
import { useSelector } from 'react-redux';
import { dataService } from '../../../../../../services/dataService';

const ds = new dataService();

const adrs = [
	{
		value: 'Отеделение Почты России №41532643 обл. Омская, г. Омск, ул. 70 лет Октября, д. 19'
	},
	{
		value: 'Отеделение Почты России №41532643 обл. Омская, г. Омск, ул. 70 лет Октября, д. 19'
	}
]

export const LkAdr = () => {
	const {token, userData} = useSelector(state => state.mainReducer);

	const [addAdress, setAddAdress] = useState(false);
	const [address, setAddress] = useState([]);
	const [list, setList] = useState(adrs)

	const handleAddAdress = () => {
		setAddAdress(!addAdress);
	}

	const handleDelete = (adrId) => {
		ds.deleteAddress(token, adrId).then(res => {
			setAddress([])
		})
	}
	
	useEffect(() => {
		if (userData) {
			ds.getAddress(token, userData.id).then(res => {
				setAddress(res)
			})
		}
	}, [userData, address])

	return (
		<div className="LkAdr">
				<AdressModal open={addAdress} closeModal={handleAddAdress} />
			<div className="LkAdr__add">
				<button onClick={handleAddAdress}>Добавить адрес</button>
			</div>
			<div className="LkAdr__ex">
				Вы можете менять свои личные данные, подтверждать почту, управлять аккаунтом и настройками безопасности в защищённом сервисе Talier
			</div>
			<div className="LkAdr__body">
				{
					address && address.length > 0 ? (
						address.map((item, index) => (
							<div className="LkAdr__body_item" key={index}>
								<div className="LkAdr__body_item_value">
									<div className="LkAdr__body_item_value_icon">
										<HiOutlineInbox />
									</div>
									{item.address}
								</div>
								<div className="LkAdr__body_item_edit">
									<button onClick={() => handleDelete(item.id)}>Удалить</button>
								</div>
							</div>
						))
					) : null
				}
			</div>
		</div>
	)
}