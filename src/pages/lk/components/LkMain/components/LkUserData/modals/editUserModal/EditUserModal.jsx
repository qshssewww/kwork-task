import { Col, Modal, Row, message } from "antd"
import { useDispatch, useSelector } from "react-redux";

import { InputB } from "../../../../../../../../components/InputB/InputB"
import { LockOutlined, MailFilled, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "../../../../../../../../components/Button/Button";
import { useEffect, useState } from "react";
import { authService } from "../../../../../../../../services/authService";
import moment from "moment";
import { updateUserData } from "../../../../../../../../store/actions";

const as = new authService();

const LOCAL_STORAGE = window.localStorage;

export const EditUserModal = ({ visible, close, data, onEdit }) => {
	const dispatch = useDispatch();
	const { token, userData } = useSelector(state => state.mainReducer);

	const [firstName, setFirstName] = useState(userData.first_name)
	const [lastName, setLastName] = useState(userData.last_name)
	const [db, setDb] = useState('')
	const [oldPassword, setOldPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')

	const [load, setLoad] = useState(false)
	const [points, setPoints] = useState('')

	const onSave = () => {
		setLoad(true)
		const body = {
			first_name: firstName,
			last_name: lastName,
			old_password: oldPassword,
			new_password: newPassword
		}
		// console.log(body)
		as.putUser(token, userData.id, body).then(async res => {
			if (res.status == 200) {
				as.getUserData(token).then(res => {
					dispatch(updateUserData(res))
					LOCAL_STORAGE.setItem('user-telier', JSON.stringify(res))
				})
			} 
			return await res.json()
		}).then(res => {
			if (res.password) {
				message.error(res.password)
			}
			if (res.detail) {
				message.error('Произошла ошибка')
			}
			if (res.message) {
				message.success('Данные успешно обновлены')
				close()
				setNewPassword('')
				setOldPassword('')
			}
		}).finally(_ => {
			setLoad(false)
		})
	}

	const closeHandle = () => {
		close()
		setNewPassword('')
		setOldPassword('')
	}


	return (
		<Modal width={500} className="EditUserModal modal" open={visible} onCancel={closeHandle}>
			<h3 className="EditUserModal__head modal__head">Изменить профиль</h3>
			<div className="EditUserModal__body">
				<Row gutter={[0, 20]}>
					<Col span={24}>
						<InputB
							value={firstName}
							onChange={e => setFirstName(e.target.value)}
							label={'Имя'}
							placeholder={"Иван"}
							prefix={<UserOutlined style={{ color: '#98989E' }} />}
						/>
					</Col>
					<Col span={24}>
						<InputB
							value={lastName}
							onChange={e => setLastName(e.target.value)}
							label={'Фамилия'}
							placeholder={"Иванов"}
							prefix={<UserOutlined style={{ color: '#98989E' }} />}
						/>
					</Col>
					<Col span={24}>
						<InputB
							onChange={e => setOldPassword(e.target.value)}
							type={'password'}
							label={'Старый пароль'}
							placeholder={"Старый пароль"}
							value={oldPassword}
							prefix={<LockOutlined style={{ color: '#98989E' }} />}
						/>
					</Col>
					<Col span={24}>
						<InputB
							onChange={e => setNewPassword(e.target.value)}
							type={'password'}
							label={'Новый пароль'}
							placeholder={"Новый пароль"}
							value={newPassword}
							prefix={<LockOutlined style={{ color: '#98989E' }} />}
						/>
					</Col>
					<Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
						<Button
							load={load}
							onClick={onSave}
							round
							style={{ width: 'auto', paddingLeft: 40, paddingRight: 40 }}
							text={'Сохранить'}
							variant={'primary'}
						/>
					</Col>
				</Row>
			</div>
		</Modal>
	)
}