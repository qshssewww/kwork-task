import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';

import { Carousel } from "../../components/Carousel/Carousel";
import { Ribbon } from '../../components/Ribbon/Ribbon';
import { loadProducts, selectAllProducts } from '../../components/Product/products-slice';
import { Footer } from '../../components/Footer/Footer';
import { Ns } from '../../components/Ns/Ns';
import { Header } from '../../components/Header/Header';
import { globaLoadState } from '../../store/actions';





export const HomePage = () => {
	// const [selectedFile, setSelectedFile] = React.useState(null);

	// let children = {
	// 	"image": selectedFile
	// }

	// const handleSubmit = async (event) => {
	// 	event.preventDefault()
	// 	const formData = new FormData();
	// 	formData.append('images[0][image]', selectedFile)
	// 	// console.log(formData.get('images[0]["image"]'))
	// 	formData.append("text", "Chris");
	// 	formData.append("rating", '5');
	// 	try {
	// 		const response = await axios({
	// 			method: "post",
	// 			url: "http://127.0.0.1:8000/api/v1/review/add",
	// 			data: formData,
	// 			headers: { "Content-Type": "multipart/form-data" },
	// 		}).then((res) =>{
	// 			console.log(res.data)
	// 		})
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }

	// const handleFileSelect = (event) => {
	// 	setSelectedFile(event.target.files[0])
	// }
	const dispatch = useDispatch();
	const products = useSelector(selectAllProducts);

	useEffect(() => {
		if (products == 0) {
			dispatch(loadProducts());
		}
		dispatch(globaLoadState(false))
	}, [products, dispatch])

	return (
		<motion.div>
			<Header />
			<Carousel />
			{
				products[0] ? (
					<Ribbon title={"Для вас"} list={products[0].result} type={'products'} />
				) : null
			}
			{/* <form onSubmit={handleSubmit}>
				<input type="file" onChange={handleFileSelect} />
				<input type="submit" value="Upload File" />
			</form> */}
			<Ns />
			<Footer />
		</motion.div>
	)
}