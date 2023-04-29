import { LockFilled, UserOutlined } from "@ant-design/icons";
import { Form, message, Modal } from "antd";
import { Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authService } from "../../../services/authService";
import { addItemToBasket, updateToken, updateUserData } from "../../../store/actions";
import { InputB } from "../../InputB/InputB";
import { Button } from "../../Button/Button";
import { dataService } from "../../../services/dataService";

const LOCAL_STORAGE = window.localStorage;
const ds = new dataService();

const as = new authService();

const initForm = {
	phone_number: '',
	password: ''
}


export const Login = ({ open, closeHandle, toggleAuth, setLogOrSign }) => {
	const dispatch = useDispatch()
	const { token, userData, basket, favorite } = useSelector(state => state.mainReducer)
	const [errorEmail, setErrorEmail] = useState('')
	const [errorPassword, setErrorPassword] = useState('');

	const handleChangeModal = () => {
		setLogOrSign(true)
		toggleAuth(true);
		closeModal();
	}

	const closeModal = () => {
		closeHandle()
		setErrorPassword('')
		setErrorEmail('')
	}

	return (
		<Modal width={404} className="Auth" open={open} onCancel={closeModal}>
			<Formik
				initialValues={initForm}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(true);
					as.login(values).then(async res => {
						if (res.status == 200) {
							return await res.json()
						} else {
							setErrorPassword(res.password)
							setErrorEmail(res.email)
							message.error('Не правильный логин или пароль')
							setSubmitting(false)
						}
					}).then(res => {
						if (res) {
							dispatch(updateToken(res.auth_token))
							LOCAL_STORAGE.setItem('token-telier', JSON.stringify(res.auth_token))

							try {
								as.getUserData(res.auth_token).then(res => {
									dispatch(updateUserData(res))
									LOCAL_STORAGE.setItem('user-telier', JSON.stringify(res))
								})
							} catch (err) {
								message.error(err)
							}
							closeHandle()
							message.success('Вы вошли в свой аккаунт')
						}
					}).finally(_ => {
						setSubmitting(false)
					})
				}}
			// 		console.log(res.status)
			// 		if(!values) {
			// 			if(res.non_field_errors) {
			// 				message.error(res.non_field_errors)
			// 			} else if(res.password) {
			// 				message.error(res.password)
			// 			} else {
			// 				message.error(res.email)
			// 			}
			// 			setErrorPassword(res.password)
			// 			setErrorEmail(res.email)
			// 		} else {
			// 			dispatch(updateToken(res.auth_token))
			// 			LOCAL_STORAGE.setItem('token-telier', JSON.stringify(res.auth_token))
			// 			console.log(`status is ${res.status}`)
			// 			try {
			// 				as.getUserData(res.auth_token).then(res => {
			// 					dispatch(updateUserData(res))
			// 					LOCAL_STORAGE.setItem('user-telier', JSON.stringify(res))
			// 			})
			// 			} catch(err) {
			// 				console.log(err)
			// 				message.error(err)
			// 			}
			// 			closeHandle()
			// 			message.success('Вы вошли в свой аккаунт')
			// 		}
			// 	}).finally(_ => {
			// 		setSubmitting(false)
			// 	})
			// }}
			>
				{({ values, errors, isSubmitting, handleChange, hangleBlur, submitForm }) => (
					<Form className="Auth__body Login">
						<div className="Auth__body_head">
							<div className="Auth__body_head_subtitle">Здравствуйте!</div>
							<div className="Auth__body_head_title">
								Войдите в личный кабинет
							</div>
						</div>
						<div className="Auth__body_content">
							<div className="Auth__body_content_item Auth__body_content_item-input">
								<InputB
									value={values.phone_number}
									onChange={handleChange}
									onBlur={hangleBlur}
									prefix={<UserOutlined style={{ color: '#98989E' }} />}
									label={"Номер телефона"}
									name={'phone_number]'}
									placeholder={'Ваш номер телефона'}
									type={'tel'}
									error={errorEmail}
								/>
							</div>
							<div className="Auth__body_content_item Auth__body_content_item-input">
								<InputB
									value={values.password}
									onChange={handleChange}
									onBlur={hangleBlur}
									prefix={<LockFilled style={{ color: '#98989E' }} />}
									label={"Пароль"}
									name={'password'}
									placeholder={'Ваш пароль'}
									type={'password'}
									error={errorPassword}
								/>
							</div>
							<div className="Auth__body_content_item Auth__body_content_item-action">
								<Button
									load={isSubmitting}
									text={'Войти'}
									variant={'primary'}
									type={'submit'}
									onClick={submitForm}
									round
								/>
							</div>
						</div>
						<div className="Auth__body_ex">
							<div className="Auth__body_ex_qs">
								Нет аккаунта? <span onClick={handleChangeModal}>Зарегистрироваться →</span>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</Modal >
	)
}