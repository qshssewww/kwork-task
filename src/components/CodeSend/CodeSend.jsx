import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Modal, message } from 'antd';
import * as Yup from 'yup';

import { Button } from '../Button/Button';
import { authService } from '../../services/authService';

const initForm = {
	code1: '',
	code2: '',
	code3: '',
	code4: ''
}

const as = new authService();

export const CodeSend = ({ open, closeHandle, toggleAuth, setPhoneNumber }) => {

	const handleChangeModal = () => {
		toggleAuth(true);
		closeHandle();
	}

	return (
		<Modal width={500} className="Auth" open={open} onCancel={closeHandle}>
			<Formik
				initialValues={initForm}
				validationSchema={Yup.object({
					code1: Yup.number().min(0).max(9).required().integer(),
					code2: Yup.number().min(0).max(9).required().integer(),
					code3: Yup.number().min(0).max(9).required().integer(),
					code4: Yup.number().min(0).max(9).required().integer(),
				  })}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(true);

					const data = {
						phone_number: setPhoneNumber,
						verification_code: `${values.code1}${values.code2}${values.code3}${values.code4}`,
					}

					as.confirmcode(data).then(async res => {
						if (res.status == 200) {
							return await res.json()
						} else {
							message.error('Не правильный код подтверждения')
							setSubmitting(false)
						}
					}).then(res => {
						if (res) {
							handleChangeModal()
							message.success('Аккаунт подтвержден')
						}
					}).finally(_ => {
						setSubmitting(false)
					})
				}}
			>
				{({ values, handleChange, handleBlur, isSubmitting }) => {
					return <Form className="Signup Auth__body">
						<div className="Auth__body_head">
							<div className="Auth__body_head_subtitle">Подтверждение номера телефона!</div>
							<div className="Auth__body_head_title">Введите код, который мы отправили на ваш номер телефона:</div>
						</div>
						<div className="Auth__body__content">
							<div className="Auth__body_content_item Auth__body_content_item-input Signup__codesend
				">				<Field
									type="text"
									min="0"
									name="code1"
									pattern="[0-9]*" 
									maxlength="1"
									required
								/>
								<Field
									type="text"
									name="code2"
									min="0"
									pattern="[0-9]*" 
									maxlength="1"
									required
								/>
								<Field
									type="text"
									min="0"
									name="code3"
									pattern="[0-9]*" 
									maxlength="1"
									required
								/>
								<Field
									type="text"
									min="0"
									name="code4"
									pattern="[0-9]*" 
									maxlength="1"
									required
								/>
							</div>
							<div className="Auth__body_content_item Auth__body_content_item-action">
								<Button
									disabled={!values.code1 || !values.code2 || !values.code3 || !values.code4}
									load={isSubmitting}
									text={'Подтвердить'}
									variant={'primary'}
									type={'submit'}
								// onClick={submitForm}
								/>
							</div>
						</div>
					</Form>
				}}
			</Formik>
		</Modal >
	)
}