import { motion } from 'framer-motion';

import { Header } from "../../components/Header/Header";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { dataService } from '../../services/dataService';
import { Footer } from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { globaLoadState } from '../../store/actions';

const ds = new dataService();

export const Notfound = ({ user }) => {
	const [list, setList] = useState([])
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(globaLoadState(false))
	}, [])

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="Notfound page">
			<Header />
			<main>
				<div className="container">
					<div className="Notfound__in">
						<h1 className="Notfound__title section_title">{!user ? 'Произошла ошибка! 404' : 'Зарегистрируйтесь на сайте!'}</h1>
						<Link className='Notfound__link' to={'/'}>Вернуться на главную</Link>
					</div>
				</div>
			</main>
			<Footer />
		</motion.div>
	)
}