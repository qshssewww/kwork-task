import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import { RiErrorWarningLine } from 'react-icons/ri';
import { EditUserModal } from './modals/editUserModal/EditUserModal';


export const LkUserData = () => {
	const { token, userData } = useSelector(state => state.mainReducer)
	const [editModal, setEditModal] = useState(false)
	const [localData, setLocalData] = useState()

	const closeEditModal = () => {
		setEditModal(false)
		setLocalData(null)
	}

	const openEditModal = () => {
		setEditModal(true)
		setLocalData(userData)
	}

	useEffect(() => {
		setLocalData(userData)
	}, [userData])

	return (
		<div className="LkUserData">
			<EditUserModal
				data={localData}
				onEdit
				visible={editModal}
				close={closeEditModal}
			/>
			<div className="LkUserData__ex">Вы можете менять свои личные данные, подтверждать почту, управлять аккаунтом и настройками безопасности в защищённом сервисе Talier</div>
			<div className="LkUserData__warning">
				<div className="LkUserData__warning_icon">
					<RiErrorWarningLine />
				</div>
				Укажите недостающие данные, чтобы защитить свой аккаунт
			</div>
			<div className="LkUserData__body">
				<Row gutter={[40, 0]}>
					<Col span={6}>
						<div className="LkUserData__body_item">
							<div className="LkUserData__body_item_head">
								<div className="LkUserData__body_item_head_label">Телефон</div>
							</div>
							<div className="LkUserData__body_item_value">
								{
									userData?.phone_number ? `+${userData.phone_number}` : 'Не указано'
								}
							</div>
						</div>
					</Col>
					<Col span={6}>
						<div className="LkUserData__body_item">
							<div className="LkUserData__body_item_head">
								<div className="LkUserData__body_item_head_label">Имя</div>
								<div onClick={openEditModal} className="LkUserData__body_item_head_edit">Изменить</div>
							</div>
							<div className="LkUserData__body_item_value">
								{
									userData?.first_name ? userData.first_name : 'Не указано'
								}
							</div>
						</div>

					</Col>
					<Col span={6}>
						<div className="LkUserData__body_item">
							<div className="LkUserData__body_item_head">
								<div className="LkUserData__body_item_head_label">Фамилия</div>
								<div onClick={openEditModal} className="LkUserData__body_item_head_edit">Изменить</div>
							</div>
							<div className="LkUserData__body_item_value">
								{
									userData?.last_name ? userData.last_name : 'Не указано'
								}
							</div>
						</div>

					</Col>
					<Col span={6}>
						<div className="LkUserData__body_item">
							<div className="LkUserData__body_item_head">
								<div className="LkUserData__body_item_head_label">Пароль</div>
								<div onClick={openEditModal}
									className="LkUserData__body_item_head_edit">Изменить</div>
							</div>
							<div className="LkUserData__body_item_value">
								********
							</div>
						</div>
					</Col>
					{/* <Col span={6}>
					<div className="LkUserData__body_item">
						<div className="LkUserData__body_item_head">
							<div className="LkUserData__body_item_head_label">Пароль</div>
							<div onClick={openEditModal} 
							className="LkUserData__body_item_head_edit">Изменить</div>
						</div>
						<div className="LkUserData__body_item_value">
							{
								userData?.email ? userData.email : 'Не указано'
							}
						</div>
					</div>
				</Col> */}

				</Row>
			</div>
		</div>
	)
}