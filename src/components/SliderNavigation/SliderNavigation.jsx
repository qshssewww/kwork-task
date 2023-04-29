import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useSwiper } from 'swiper/react';
import { useEffect, useState } from 'react';

export const NavNext = ({ vertical }) => {
	const swiper = useSwiper();

	return (
		<button onClick={() => swiper.slideNext()} className={vertical ? 'NavItemVertical NavNextVertical' : 'NavItem NavNext'} >
			<div className="NavItem__icon"><RightOutlined /></div>
		</button>
	)
}

export const NavPrev = ({ vertical }) => {
	const swiper = useSwiper();

	return (
		<button onClick={() => swiper.slidePrev()} className={vertical ? 'NavItemVertical NavPrevVertical' : 'NavItem NavPrev'} >
			<div className="NavItem__icon"><LeftOutlined /></div>
		</button>
	)
}