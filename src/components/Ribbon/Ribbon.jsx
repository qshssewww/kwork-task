import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"

import { NavNext, NavPrev } from "../SliderNavigation/SliderNavigation"
import { EmptyList } from "../placeholders/EmptyList/EmptyList"
import { Product } from "../Product/Product"

export const Ribbon = ({ list, title, type }) => {
	const [slidesPerView, setSlidesPerView] = useState(5);

	// useEffect(() => {
	// 	function handleResize() {
	// 		const windowWidth = window.innerWidth;
	// 		if (windowWidth >= 1024) {
	// 			setSlidesPerView(5);
	// 		} else if (windowWidth >= 425 && windowWidth <= 1024) {
	// 			setSlidesPerView(3);
	// 		} else {
	// 			setSlidesPerView(2);
	// 		}
	// 	}

	// 	window.addEventListener('resize', handleResize);

	// 	return () => {
	// 		window.removeEventListener('resize', handleResize);
	// 	};
	// }, [])


	if (type && type === 'products') {
		return (
			<div className="Ribbon">
				<div className="container">
					<div className="Ribbon__in">
						<div className="Ribbon__head">
							<span className="Ribbon_head_title section_title">{title}</span>
						</div>
						<div className="Ribbon__body">
							{
								list ? (
									<Swiper
										className="Ribbon__body_slider"
										spaceBetween={20}
										// slidesPerView={slidesPerView}
										slideToClickedSlide
										breakpoints={{
											// when window width is <= 480px (mobile devices)
											0: {
												slidesPerView: 2,
											},
											768: {
												slidesPerView: 3,
											},
											// when window width is <= 768px (tablets)
											1024: {
												slidesPerView: 5,
											},
										}}
									>
										<NavPrev />
										<NavNext />
										{
											list.map((item, index1) => {
												return item.variants_set.map((itemVariant, index2) => {
													return <SwiperSlide className="Ribbon__body_slider_sl" key={index2}>
														<Product
															id={itemVariant.id}
															name={itemVariant.title}
															discount={itemVariant.discount}
															price={itemVariant.price}
															get_sale={itemVariant.get_sale}
															is_published={itemVariant.is_published}
															images={itemVariant.images[0].image_urls}
														/>
													</SwiperSlide>
												})
											})
										}
									</Swiper>
								) : <EmptyList text={"Тут пусто"} />
							}
						</div>
					</div>
				</div>
			</div>
		)
	}
}
