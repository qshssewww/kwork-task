import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { motion } from 'framer-motion';
import { SmileOutlined } from "@ant-design/icons";

import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { List } from "../../components/List/List";
import { globaLoadState } from "../../store/actions";



export const FavsPage = () => {
	const dispatch = useDispatch();
	const { favorite } = useSelector(state => state.mainReducer);
	const [list, setList] = useState([]);

	useEffect(() => {
		dispatch(globaLoadState(false))
	}, [])

	return (
		<motion.div>
			<Header />
			<List icon={<SmileOutlined />}  title={'Избранные'} list={favorite} />
			<Footer />
		</motion.div>
	)
}