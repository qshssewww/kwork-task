import useModal from "antd/es/modal/useModal"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Button } from "../../../components/Button/Button"
import { RevList } from "./components/RevList/RevList";
import { dataService } from "../../../services/dataService";
import { AddRev } from "../AddRev/AddRev";
import { message } from "antd";
import { Rating } from "../../../components/Rating/Rating";

const ds = new dataService();

export const ProductRev = ({ productId }) => {
	const { hideModal } = useModal()
	const { token } = useSelector(state => state.mainReducer);

	const [revList, setRevList] = useState([]);
	const [averageCount, setAverageCount] = useState(0);
	const [sort, setSort] = useState('newest')
	const [totalCount, setTotalCount] = useState(0)
	const [page, setPage] = useState(1)
	const [moreBtnLoad, setMoreBtnLoad] = useState(false)
	const [showModal, setShowModal] = useState(false)

	const updateList = () => {
		setSort('newest');
		ds.getDetailProduct(productId).then(res => {
			setTotalCount(res?.product?.product_rating?.length)
			setAverageCount(res?.middle_star)
			console.log(res.middle_star)

			ds.getRevs(sort, res?.product?.id).then(res => {
				setRevList(res)
			})
		})
	}

	const errorShowModal = () => {
		message.info('Войдите в свой аккаунт')
	}

	const closeModal = () => {
		setShowModal(false)
	}

	useEffect(() => {
		// setPage(1)
		if (productId && sort) {
			ds.getDetailProduct(productId).then(res => {
				setTotalCount(res?.product?.product_rating?.length)
				if(res?.middle_star != null) {
					setAverageCount(res?.middle_star)
				}

				ds.getRevs(sort, res?.product?.id).then(res => {
					console.log(res)
					setRevList(res)
				})
			})
			console.log(token)
		}
	}, [productId, sort])

	return (
		<div className="ProductRev">
			{
				productId ? (
					<AddRev updateList={updateList} product={productId} showModal={showModal} close={closeModal} />
				) : null
			}
			<h2 className="ProductRev__title section_title">
				Отзывы
			</h2>
			<div className="ProductRev__action ProductRev__action_top">
				<div className="ProductRev__action_head">
					<Rating value={averageCount} />
					<span className="ProductRev__action_head_text">
							{averageCount} / 5
						</span>
				</div>
				{
					token ? (
						<Button onClick={() => setShowModal(true)} text={"Оставить отзыв"} variant={'primary'} />
					) : (
						<Button onClick={errorShowModal} text={"Оставить отзыв"} variant={'primary'} />
					)
				}
			</div>
			<div className="ProductRev__content">
				<RevList btnLoad={moreBtnLoad} loadMore={setPage} totalCount={totalCount} sort={sort} setSort={setSort} list={revList} />
				<div className="ProductRev__action ProductRev__action_bottom">
					<div className="ProductRev__action_head">
						<Rating value={averageCount} />
						<span className="ProductRev__action_head_text">
							{averageCount} / 5
						</span>
					</div>
					{
						token ? (
							<Button onClick={() => setShowModal(true)} text={"Оставить отзыв"} variant={'primary'} />
						) : (
							<Button onClick={errorShowModal} text={"Оставить отзыв"} variant={'primary'} />
						)
					}
				</div>
			</div>
		</div>
	)
}