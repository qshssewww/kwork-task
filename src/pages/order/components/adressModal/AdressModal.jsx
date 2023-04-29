import { Modal, message } from "antd"
import { useState } from "react";
// import { YMaps, Map, Placemark } from 'react';
import { SearchControl, YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

import { InputB } from "../../../../components/InputB/InputB";
import { Button } from "../../../../components/Button/Button";
import { dataService } from "../../../../services/dataService";
import { useSelector } from "react-redux";

const ds = new dataService();

export const AdressModal = ({ open, closeModal, toggleModal }) => {
	const { token, userData } = useSelector(state => state.mainReducer);

	const [address, setAddress] = useState('');
	const [addressForPost, setAddressForPost] = useState('');
	const [entrance, setEntrance] = useState('');
	const [apartment, setApartment] = useState('');
	const [intercom, setIntercom] = useState('');
	const [domofon, setDomofon] = useState('');
	const [mapVisible, setMapVisible] = useState(false);
	const [coordinates, setCoordinates] = useState('');


	const handleAddressClick = () => {
		setMapVisible(true);
	};

	const handleMapOk = (selectedAddress) => {
		setAddress(selectedAddress);
		setMapVisible(false);
	};

	const handleMapCancel = () => {
		setMapVisible(false);
	};

	const handleChangeModal = () => {
		toggleModal(true);
		closeModal();
	}
	const handleAddressChange = (e) => {
		setAddress(e.target.value);
	};

	const handleMapClick = async (event) => {
		const coordinates = event.get('coords');
		// TODO: Make a request to the geocoder to get the address
		// setAddress(`${coordinates[0]}, ${coordinates[1]}`);
		// const newCoordinates = event.get('coords');
		// setCoordinates(coordinates);

		const geocoder = await window.ymaps.geocode(coordinates);
		const firstGeoObject = geocoder.geoObjects.get(0);
		// const address = firstGeoObject.getAddressLine();
	};

	const handleGeocode = (geocode) => {
		const newCoordinates = geocode.geoObjects.get(0).geometry.getCoordinates();
		setCoordinates(newCoordinates);
	};

	const getAddress = () => {
		const getAllAddress = `${address} | Дом ${entrance} | Подъезд ${apartment} | Квартира ${intercom} | Домофон ${domofon}`
		setAddressForPost(getAllAddress)

		const data = {
			address: getAllAddress,
			user: userData.id
		}
		if (!token) {
			message.error('Войдите в аккаунт')
		} else {
			ds.addAddress(token, data).then(res => {
			})
		}

		closeModal()
		setAddress('')
		setApartment('')
		setDomofon('')
		setEntrance('')
		setIntercom('')
	}

	return (
		<Modal width={700} className="Auth" open={open} onCancel={closeModal} >
			<div className="Auth__body_head">
				<div className="Auth__body_head_subtitle">Добавление нового адреса</div>
				<div className="Auth__body_head_title">Выберите адрес на карте</div>
			</div>
			<div className="adress__modal">
				<YMaps query={{ apikey: '63a9a697-ca9a-4718-a3e2-06ac24fdab54' }}>
					<Map
						width="100%"
						height="100%"
						state={{
							center: [55.76, 37.64],
							zoom: 11,
						}}
						onClick={handleMapClick}
						options={{
							restrictMapArea: [
								[55.00, 36.70],
								[56.20, 38.62],
							],
							suppressMapOpenBlock: true,
							suppressObsoleteBrowserNotifier: true,
						}}
					>
						{coordinates && <Placemark geometry={coordinates} />}
						<SearchControl options={{ float: 'right' }} onResultSelect={handleGeocode} />
					</Map>
				</YMaps>
				<InputB
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					// onBlur={hangleBlur}
					// prefix={<UserOutlined style={{ color: '#98989E' }} />}
					label={"Адрес"}
					name={'adress'}
					placeholder={'Введите адрес'}
					type={'text'}
				/>
				<div className="address__first">
					<InputB
						value={entrance}
						onChange={(e) => setEntrance(e.target.value)}
						// onBlur={hangleBlur}
						// prefix={<UserOutlined style={{ color: '#98989E' }} />}
						label={"Дом"}
						name={'entrance'}
						placeholder={'Введите дом'}
						type={'text'}
					/>
					<InputB
						value={apartment}
						onChange={(e) => setApartment(e.target.value)}
						// onBlur={hangleBlur}
						// prefix={<UserOutlined style={{ color: '#98989E' }} />}
						label={"Подъезд"}
						name={'apartment'}
						placeholder={'Введите подъезд'}
						type={'text'}
					/>
				</div>
				<div className="address__second">
					<InputB
						value={intercom}
						onChange={(e) => setIntercom(e.target.value)}
						// onBlur={hangleBlur}
						// prefix={<UserOutlined style={{ color: '#98989E' }} />}
						label={"Квартира"}
						name={'apartment'}
						placeholder={'Введите квартиру'}
						type={'text'}
					/>
					<InputB
						value={domofon}
						onChange={(e) => setDomofon(e.target.value)}
						// onBlur={hangleBlur}
						// prefix={<UserOutlined style={{ color: '#98989E' }} />}
						label={"Домофон"}
						name={'apartment'}
						placeholder={'Введите домофон'}
						type={'text'}
					/>
				</div>
			</div>
			<Button
				disabled={!address}
				text={'Сохранить'}
				variant={'primary'}
				type={'submit'}
				onClick={getAddress}
				round
			/>
		</Modal >
	)
}