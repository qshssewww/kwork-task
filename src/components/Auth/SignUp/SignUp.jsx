import { Modal, message } from "antd";
import { Formik, Form } from 'formik';

import { LockFilled, PhoneFilled, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import { authService } from "../../../services/authService";
import { InputB } from "../../InputB/InputB";
import { Button } from "../../Button/Button";

const as = new authService();

const initForm = {
	phone_number: '',
	first_name: '',
	last_name: '',
	password: '',
}

export const SignUp = ({ open, closeHandle, toggleAuth, setPhoneNumber, logOrSign, setLogOrSign }) => {
	const [error, setError] = useState('');
	const [errorPhone, setErrorPhone] = useState('');
	const [errorFirstName, setErrorFirstName] = useState('');
	const [errorLastName, setErrorLastName] = useState('');
	const [errorPassword, setErrorPassword] = useState('');


	const handleChangeModal = () => {
		toggleAuth(true);
		closeHandle();
	}

	const handleChangeSignInModal = () => {
		setLogOrSign(false)
		if(logOrSign == false) {
			toggleAuth(true);
			closeHandle();
		}
	}

	useEffect(() => {
		if(logOrSign == false) {
			toggleAuth(true);
			closeHandle();
		}
	}, [logOrSign])

	return (
		<Modal width={500} className="Auth" open={open} onCancel={closeHandle}>
			<Formik
				initialValues={initForm}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(true);
					as.signup(values).then(async res => {
						return await res.json()
					}).then(res => {
						if (res.phone_number) {
							setErrorPhone(res.phone_number)
						} else {
							setErrorPhone('')
						}
						if (res.first_name) {
							setErrorFirstName(res.first_name)
						} else {
							setErrorFirstName('')
						}
						if (res.last_name) {
							setErrorLastName(res.last_name)
						} else {
							setErrorLastName('')
						}
						if (res.password) {
							setErrorPassword(res.password)
						} else {
							setErrorPassword('')
						}
						if (res.detail && res.active == 'True') {
							message.error(res.detail)
						}
						if (res.detail && res.active == 'False' || res.message == 'User registered successfully') {
							message.success('Выслан код подтверждения на ваш номер телефона')
							setPhoneNumber(values.phone_number)
							handleChangeModal()
						}
						// if (res.message == 'User registered successfully') {
						// 	message.success('Для подтверждения номера телефона вам выслан код')
						// 	handleChangeModal()
						// }
					}).finally(_ => {
						setSubmitting(false);
					})
				}}
			>
				{({ values, handleChange, handleBlur, isSubmitting }) => (
					<Form className="Signup Auth__body">
						<div className="Auth__body_head">
							<div className="Auth__body_head_subtitle">Здравствуйте!</div>
							<div className="Auth__body_head_title">Зарегистрируйтесь,что бы войти в личный кабинет</div>
						</div>
						<div className="Auth__body__content">
							<div className="Auth__body_content_item Auth__body_content_item-input
					">
								<InputB
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.first_name}
									prefix={<UserOutlined style={{ color: '#98989E' }} />}
									label={'Имя'}
									name={'first_name'}
									placeholder={'Иван'}
									type={'text'}
									error={errorFirstName} />
							</div>
							<div className="Auth__body_content_item Auth__body_content_item-input
					">
								<InputB
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.last_name}
									prefix={<UserOutlined style={{ color: '#98989E' }} />}
									label={'Фамилия'}
									name={'last_name'}
									placeholder={'Иванов'}
									type={'text'}
									error={errorLastName} />
							</div>
							<div className="Auth__body_content_item Auth__body_content_item-input
					">
								<InputB
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.phone_number}
									prefix={<PhoneFilled style={{ color: '#98989E' }} />}
									label={'Номер телефона'}
									name={'phone_number'}
									placeholder={'+7'}
									type={'tel'}
									error={errorPhone} />
							</div>
							<div className="Auth__body_content_item Auth__body_content_item-input
					">
								<InputB
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.password}
									prefix={<LockFilled style={{ color: '#98989E' }} />}
									label={'Пароль'}
									name={'password'}
									placeholder={'Пароль'}
									type={'password'}
									error={errorPassword} />
							</div>
							<div className="Auth__body_content_item Auth__body_content_item-action">
								<Button
									disabled={!values.first_name || !values.last_name || !values.password || !values.phone_number}
									load={isSubmitting}
									text={'Регистрация'}
									variant={'primary'}
									type={'submit'}
									// onClick={submitForm}
									round
								/>
							</div>
						</div>
						<div className="Auth__body_ex">
							<div className="Auth__body_ex_qs">
								Есть аккаунт? <span onClick={handleChangeSignInModal}>Войти</span>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</Modal>
	)
}