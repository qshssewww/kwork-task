import { motion } from 'framer-motion';
import { Header } from '../../components/Header/Header';
import { LkMain } from './components/LkMain/LkMain';
import { LkSideBar } from './components/LkSideBar/LkSideBar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataService } from '../../services/dataService';
import { globaLoadState } from '../../store/actions';

const ds = new dataService();

export const LkPage = () => {
	const dispatch = useDispatch();
	const { token, userData } = useSelector(state => state.mainReducer)

	const [data, setData] = useState([]);
	const [ordFilter, setOrdFilter] = useState(undefined);
	// const [prodStatus, setProdStatus] = useState('');

	useEffect(() => {
		if (userData) {
			ds.getOrder(userData.id, token).then(res => {
				setData(res)
			}).finally(_ => dispatch(globaLoadState(false)))
		}
	}, [userData])

	return (
		<motion.div className='LkPage'>
			<Header />
			<div className="container">
				<div className="LkPage__in">
					<div className="LkPage__col">
						<LkSideBar setOrdFilter={setOrdFilter} />
					</div>
					<div className="LkPage__col">
						{
							data.length > 0 ? <LkMain data={data} ordFilter={ordFilter} /> : null
						}
					</div>
				</div>
			</div>
		</motion.div>
	)
}