import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper'
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import slide from '../../assets/slides/Bg.svg';
import { NavNext, NavPrev } from '../SliderNavigation/SliderNavigation';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Carousel = () => {
	const [trueWidth, setTrueWidth] = useState(false);

	useEffect(() => {
		function handleResize() {
			const windowWidth = window.innerWidth;
			if (windowWidth >= 1024) {
				setTrueWidth(false)
			} else if (windowWidth >= 425 && windowWidth <= 1024) {
				setTrueWidth(true)
			} else {
				setTrueWidth(true)
			}
		}

		handleResize()

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [])

	return (
		<div className="Carousel">
			<div className="container">
				<div className="Carousel__in">
					<Swiper
						className='Carousel__slider'
						slidesPerView={1}
						spaceBetween={30}
						speed={1300}
						modules={[Autoplay, Pagination]}

						pagination={{
							clickable: true
						}}
						loop={true}
					>
						<NavNext />
						<NavPrev />
						<SwiperSlide>
							{
								trueWidth ? (
									<Link to={`/product/${2}`}>
										<div className="Carousel__slider_sl" style={{ backgroundImage: `url(${slide})` }}>
											<div className="Carousel__slider_sl_action">
												<button className="Carousel__slider_sl_action_btn">
													ПОДРОБНЕЕ
												</button>
											</div>
										</div>
									</Link>
								) : (
									<div className="Carousel__slider_sl" style={{ backgroundImage: `url(${slide})` }}>
										<div className="Carousel__slider_sl_action">
											<button className="Carousel__slider_sl_action_btn">
												ПОДРОБНЕЕ
											</button>
										</div>
									</div>
								)
							}
						</SwiperSlide>
						<SwiperSlide>
							<div className="Carousel__slider_sl" style={{ backgroundImage: `url(${slide})` }}>
								<div className="Carousel__slider_sl_action">
									<button className="Carousel__slider_sl_action_btn">
										ПОДРОБНЕЕ
									</button>
								</div>
							</div>
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</div>
	)
}