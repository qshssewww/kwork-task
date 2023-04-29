import { Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { BsCaretDownFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { dataService } from '../../services/dataService';
import { useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';

const ds = new dataService();
const Option = Select.Option;

const initForm = {
	search: '',
}

export const Search = () => {
	const [list, setList] = useState([]);
	const [cat, setCat] = useState('Везде');
	// const { token } = useSelector(state => state.mainReducer)

	useEffect(() => {
		ds.getCategories().then(res => {
			setList(res)
		})
	}, [])

	const handleSearch = (value, option) => {
			setCat(option.label)
	}


	return (
		<Formik
			initialValues={initForm}
			onSubmit={(values, { setSubmitting }) => {
				// ds.getCatalogProducts('', values.search).then(res => {
				// 	console.log(res)
				// 	console.log(values)
				// })

			}}
		>
			{({ values, errors, isSubmitting, handleChange, hangleBlur, submitForm }) => (
				<Form>
					<div className="Search">
						<div className="Search__filter">
							<Select dropdownMatchSelectWidth={200} dropdownStyle={{
								borderRadius: '6px',
								backgroundColor: '#EFF3F6',
								color: '#EFF3F6',
								padding: 0,
								width: 200
							}} suffixIcon={<BsCaretDownFill color='#3D5165' />}
								className='Search__filter_select' 
								defaultValue={0}
								labelInValue={false}
								onChange={handleSearch}
							>
								<Option value={0} key={0} label='Везде'>Везде</Option>
								{
									list.map((item, index) => {
										return (
											<Option value={index + 1} key={index + 1} label={item.category[0].category_name} >{item.category[0].category_name}</Option>
										)
									}
									)}
							</Select>
						</div>
						<div className="Search__input">
							<input type="text" placeholder='Поиск по товарам'
								id="search"
								name="search"
								value={values.search}
								onChange={handleChange}
								onBlur={hangleBlur} />
						</div>
						{
							values.search && cat ? (
								<Link to={`/search/${cat}/${values.search}`} href='#' className='Search__link'>
									<button className="Search__btn" type='submit'>
										<SearchOutlined />
									</button>
								</Link>
							) : null
						}
					</div>
				</Form>
			)}
		</Formik>
	)
}