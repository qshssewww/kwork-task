import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { dataService } from '../../services/dataService';
import { ProductCard } from "./ProductCard/ProductCard";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { ProductRev } from "./ProductRev/ProductRev";
import { useDispatch } from "react-redux";
import { globaLoadState } from "../../store/actions";

const ds = new dataService();

export const ProductPage = () => {
	const dispatch = useDispatch();

	const { productId } = useParams();
	const [productData, setProductData] = useState({});

	useEffect(() => {
		ds.getDetailProduct(productId).then(res => {
			setProductData(res)
		})
	}, [productId])

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="ProductPage"
		>
			<Header />
			<div className="container">
				<div className="ProductPage__in">
					<ProductCard data={productData}/>
					<ProductRev productId={productId} />
				</div>
			</div>
			<Footer />
		</motion.div>
	)
}