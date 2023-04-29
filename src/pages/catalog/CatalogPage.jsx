import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { FilterList } from './components/filterlist/FilterList';
import { Header } from '../../components/Header/Header';
import { dataService } from '../../services/dataService';
import { EmptyList } from '../../components/placeholders/EmptyList/EmptyList';
import { useDispatch } from 'react-redux';
import { globaLoadState } from '../../store/actions';

const ds = new dataService();

export const CatalogPage = () => {
	const dispatch = useDispatch()
	const { catalogTitle } = useParams();

	const [data, setData] = useState([]);

	useEffect(() => {
		if (catalogTitle) {
			ds.getCatalogProducts(catalogTitle).then(res => {
				console.log(res)
				setData(res)
			}).finally(_ => dispatch(globaLoadState(false)))
		}
	}, [catalogTitle])

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