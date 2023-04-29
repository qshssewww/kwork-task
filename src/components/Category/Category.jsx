import { useEffect, useState } from "react"
import { Tabs } from 'antd';

import { dataService } from '../../services/dataService';
import { Subcategory } from "./components/Subcategory";
import { useSelector } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";

const ds = new dataService();

export const Category = ({ active, setCategory }) => {
	const [list, setList] = useState([]);
	const { token } = useSelector(state => state.mainReducer)

	const handleClose = () => {
		setCategory(!active)
	}

	useEffect(() => {
		ds.getCategories().then(res => {
			setList(res)
		})
	}, [])

	return (
		<div className={'Menu' + (active ? ' active' : '')}>
			{
				active ? (
					<button className="Menu__btn" onClick={handleClose}>
						<span className="Menu__btn_icon">
							<CloseOutlined />
						</span>
					</button>
				) : null
			}
			<Tabs
				className="Menu__body"
				tabPosition="left"
				items={
					list && list.map((item, index) => {
						return {
							label: item.category[0].category_name,
							key: index + 1,
							children: <Subcategory list={item.subcategory} index={index} />
						}
					})
				}
			/>
		</div>
	)
}