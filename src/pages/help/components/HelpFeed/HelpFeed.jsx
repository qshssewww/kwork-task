import { Input, message } from "antd";
import { Formik, Form } from "formik";

import { Button } from "../../../../components/Button/Button";

const {TextArea} = Input;

const fetchMock = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve({ success: true })
	}, 3000)
})

export const HelpFeed = () => {

	return (
		<div className="HelpFeed">
			<h3 className="HelpFeed__title">Не помогла статья?</h3>
			<div className="HelpFeed__subtitle">Напишите нам!</div>
			<Formik
				initialValues={{
					email: '',
					text: '',
				}}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					setSubmitting(true);
					if (values.email != '' && values.text != '') {
						fetchMock.then(res => {
							if (res.success) {
								message.success('Ваше обращение отправлено, скоро мы с вами свяжемся')
							} else {
								message.error('Произошла ошибка, повторите позже')
							}
						}).finally(_ => {
							setSubmitting(false)
							resetForm()
						})
					} else {
						message.info('Заполните пожалуйста форму')
						setSubmitting(false)
					}

				}}
			>
				{({ values, errors, touched, isSubmitting, handleChange, handleBlur }) => (
					<Form className='HelpFeed__body'>
						<div className="HelpFeed__body_rw">
							<Input
								name='email'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
								className='c-input'
								type='email'
								placeholder='Ваш e-mail ' />
						</div>
						<div className="HelpFeed__body_rw">
							<TextArea
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.text}
								name='text'
								placeholder='Ваше сообщение' />
						</div>
						<div className="HelpFeed__body_rw HelpFeed__body_rw-action">
							<Button load={isSubmitting} variant={'primary'} text={'Отправить'} type={'submit'} />
						</div>
					</Form>
				)}
			</Formik>

		</div>
	)
}