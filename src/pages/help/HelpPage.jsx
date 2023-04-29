import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { Tabs } from "antd";

import { globaLoadState } from "../../store/actions";
import { dataService } from "../../services/dataService";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { HelpContent } from './components/HelpContent/HelpContent';
import { HelpFeed } from './components/HelpFeed/HelpFeed';

const ds = new dataService();

const list = [
	{
		title: 'dasas',
		descriptions: 'adsdas'
	}
]

export const HelpPage = () => {
	const dispatch = useDispatch();
	// const [list, setList] = useState([])

	// useEffect(() => {
	// 	dispatch(globaLoadState(true))
	// 	ds.getHelp().then(res => {
	// 		setList(res.results)
	// 	}).finally(_ => {
	// 		dispatch(globaLoadState(false))
	// 	})
	// }, [])

	useEffect(() => {
		dispatch(globaLoadState(false))
	}, [])


	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}

			className="HelpPage">
			<Header />
			<div className="container">
				<div className="HelpPage__in">
					<div className="HelpPage__body">
						<Tabs
							className='HelpPage__body_tabs'
							tabPosition={'left'}
							defaultActiveKey='1'
							items={
								list?.map((item, index) => {
									return {
										label: item.title,
										key: index + 1,
										children: <><HelpContent text={item.descriptions} title={item.title} /><HelpFeed /></>
									}
								})
							}
						/>
					</div>
				</div>
			</div>
			<Footer />
		</motion.div>
	)
}