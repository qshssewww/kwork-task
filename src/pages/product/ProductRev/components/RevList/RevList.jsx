import { useEffect, useState } from 'react';
import { Select } from 'antd';
import { BsCaretDownFill } from 'react-icons/bs';
import { SmileOutlined } from '@ant-design/icons';

import { Login } from '../../../../../components/Auth/Login/Login';
import { EmptyList } from '../../../../../components/placeholders/EmptyList/EmptyList'
import { Button } from '../../../../../components/Button/Button';
import { RevItem } from '../RevItem/RevItem';

const { Option } = Select;

const sortTypes = [
	{
		label: 'сначала новые',
		value: 'newest'
	},
	{
		label: 'сначала старые',
		value: 'oldest'
	},
	// {
	// 	label: 'с начала с высоким рейтингом',
	// 	value: '-rating'
	// },
	// {
	// 	label: 'с начала с низким рейтингом',
	// 	value: 'rating'
	// }
]

export const RevList = ({ list, setSort, sort, totalCount, loadMore, btnLoad }) => {
	const [login, setLogin] = useState(false)
	const [signup, setSignup] = useState(false)
	const [moreBtn, setMoreBtn] = useState(false)

	const handleLogin = () => {
		setLogin(!login)
	}

	const handleSignup = () => {
		setSignup(!signup)
	}

	const handleSort = (value) => {
		setSort(value)
	}

	useEffect(() => {
		if (list.length >= totalCount) {
			setMoreBtn(false)
		} else {
			setMoreBtn(true)
		}
	}, [totalCount, list])

	return (
		<div className="RevList">
			<Login open={login} closeHandle={handleLogin} toggleAuth={setSignup} />
			<div className="RevList__top">
				<Select
					className='RevList__top_filter Search__filter_select'
					value={sort}
					onChange={handleSort}
					dropdownStyle={{
						borderRadius: '6px',
						backgroundColor: '#EFF3F6',
						padding: 0, width: 200
					}} suffixIcon={<BsCaretDownFill color='#3D5165' />} >
					{
						sortTypes.map((item, index) => (
							<Option className={'RevList__top_filter_item Search__filter_select_item'} value={item.value} key={index}>
								{item.label}
							</Option>
						))
					}
				</Select>
			</div>
			<div className="RevList__body">
				{
					list && list.length > 0 ? (
						list?.map((item, index) => (
							<div className="RevList__body_item" key={index}>
								<RevItem
									key={index}
									id={item.id}
									openLogin={handleLogin}
									avatar={''}
									username={item.user.first_name}
									rating={item.star.value}
									text={item.text}
									date={item.created}
									productId={item.product}
								/>
							</div>
						))
					) : <EmptyList text={'Нет отзывов'} icon={<SmileOutlined />} />
				}
			</div>
			{
				moreBtn ? (
					<div className="RevList__action">
						<Button load={btnLoad} onClick={() => loadMore(state => state + 1)} text={'Показать еще'} variant={'primary'} />
					</div>
				) : null
			}
		</div>
	)
}