import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from 'framer-motion';

import { dataService } from "../../services/dataService";
import { Header } from "../../components/Header/Header";
import { FilterList } from "../catalog/components/filterlist/FilterList";
import { EmptyList } from "../../components/placeholders/EmptyList/EmptyList";
import { useDispatch } from "react-redux";
import { globaLoadState } from "../../store/actions";


const ds = new dataService();

export const SearchPage = () => {
	const dispatch = useDispatch();
	const { searchText, catalogName } = useParams();
	const [data, setData] = useState([]);

	useEffect(() => {
		setData([])
		ds.getCatalogProducts('', catalogName, searchText).then(res => {
			setData(res)
		}).finally(_ => dispatch(globaLoadState(false)))
		
	}, [searchText, catalogName])
	return (
		<motion.div className='CatalogPage page'>
			<Header />
			{
				data && data.length > 0 ? (
					<div className='CatalogPage__body'>
						<div className="container">
							<div className="CatalogPage__body_in">
								{/* <Filter /> */}
								<FilterList list={data} />
							</div>
						</div>
					</div>
				) : <EmptyList text={'Ничего не найдено'} />
			}
		</motion.div>
	)
}