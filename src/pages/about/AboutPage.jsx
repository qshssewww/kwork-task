import { motion } from 'framer-motion';
import { FaTelegramPlane } from "react-icons/fa";
import { useDispatch } from 'react-redux';

import { PhoneOutlined, MailOutlined, TwitterOutlined, InstagramOutlined, YoutubeOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

import { Header } from '../../components/Header/Header';
import { globaLoadState } from '../../store/actions';
import { Ns } from '../../components/Ns/Ns';
import { Footer } from '../../components/Footer/Footer';

export const AboutPage = () => {
	const dispatch = useDispatch();


	useEffect(() => {
		dispatch(globaLoadState(false))
	}, [])


	return (
		<motion.div

			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="AboutPage page">
			<Header />
			<div className="AboutPage__main">
				<div className="container">
					<div className="AboutPage__main_in">
						<div className="AboutPage__main_content">
							<h1 className="AboutPage__main_content_title section_title">О Telier</h1>
							<div className="AboutPage__main_content_text">
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit,
									sed do eiusmod tempor incididunt
									ut labore et dolore magna aliqua.
									Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</p>
							</div>
							<div className="AboutPage__main_content_ex">
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit,
									sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
								</p>
							</div>
						</div>
						{/* <div className="AboutPage__main_img">
							<img src={img} alt="" />
						</div> */}
					</div>
				</div>
			</div>
			<div className="AboutPage__info">
				<div className="container">
					<div className="AboutPage__info_in">
						<h2 className="AboutPage__info_title section_title">Связаться с нами</h2>
						<div className="AboutPage__info_body">
							<div className="AboutPage__info_body_item">
								<a href="tel:">
									<span className='AboutPage__info_body_item_icon'><PhoneOutlined /></span>
									+7 948 999 01 99
								</a>

							</div>
							<div className="AboutPage__info_body_item">
								<a href="mailto:contact@telier.com">
									<span className='AboutPage__info_body_item_icon'><MailOutlined /></span>
									contact@telier.com
								</a>
							</div>
							<div className="AboutPage__info_body_soc">
								<div className="AboutPage__info_body_soc_name">
									Мы в соц.сетях
								</div>
								<div className="AboutPage__info_body_soc_list">
									<a href="#">
										<TwitterOutlined />
									</a>
									<a href="#">
										<InstagramOutlined />
									</a>
									<a href="#">
										<YoutubeOutlined />
									</a>
									<a href="#">
										<FaTelegramPlane />
									</a>
									<a href="#">
										<WhatsAppOutlined />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Ns />
			<Footer />
		</motion.div>
	)
}