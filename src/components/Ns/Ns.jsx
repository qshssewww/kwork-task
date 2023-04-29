import { message } from 'antd';
import { Formik, Form } from 'formik';
import { Button } from '../Button/Button';

const fetchMock = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve({ success: true })
	}, 3000)
})

export const Ns = () => {
	return (
		<div className="Ns">
			<div className="container">
				<div className="Ns__in">
					<Formik
						initialValues={{
							email: ''
						}}
						onSubmit={(values, { setSubmitting, resetForm }) => {
							if (values.email != '') {
								fetchMock.then(res => {
									if (res.success) {
										message.success('Вы подписались на обьявления')
									} else {
										message.error('Произошла ошибка, повторите позже')
									}
								}).finally(_ => {
									setSubmitting(false)
									resetForm()
								})
							} else {
								message.info('Заполните форму')
								setSubmitting(false)
							}
						}}
					>
						{({ values, errors, isSubmitting, handleChange, handleBlur }) => (
							<Form className='Ns__form'>
								<div className="Ns__form_head">
									<h2 className='Ns__form_head_title section_title'>Узнавайте о новых акциях</h2>
									<div className="Ns__form_head_text">Подпишитесь и получайте промокоды, акции и подборки товаров на свою почту.</div>
								</div>
								<div className="Ns__form_row">
									<div className="Ns__form_input">
										<input
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.email}
											type='email'
											name='email'
											placeholder='Ваш e-mail'
										/>
									</div>
									<div className="Ns__form_action">
										<Button
											type={'submit'}
											load={isSubmitting}
											variant={'primary'}
											text='Подписаться'
										/>
									</div>
								</div>
								<div className="Ns__form_ex">
									Нажимая на кнопку я подтверждаю обработку 
									<a href="#"> персональных данных</a>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	)
}