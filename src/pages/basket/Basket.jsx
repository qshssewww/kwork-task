import { useDispatch, useSelector } from "react-redux"
import {motion} from 'framer-motion';

import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { Ns } from "../../components/Ns/Ns";
import { Ribbon } from "../../components/Ribbon/Ribbon";
import { BasketMain } from "./components/BasketMain/BasketMain";
import { BasketInfo } from "./components/BasketInfo/BasketInfo";
import { useEffect } from "react";
import { dataService } from "../../services/dataService";

export const BasketPage = () => {

	return (
		<motion.div className="BasketPage page">
			<Header />
			<div className="container">
				<div className="BasketPage__in">
					<h2 className="BasketPage__head section__title">
						Корзина
					</h2>
					<div className="BasketPage__body">
						<BasketMain />
						<BasketInfo />
					</div>
				</div>
			</div>
			{/* <Ribbon /> */}
			<Footer />
		</motion.div>
	)
}