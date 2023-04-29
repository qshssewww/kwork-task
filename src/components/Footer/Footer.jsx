import { Link } from "react-router-dom"

import logo from '../../assets/Logo.svg'
import visa from '../../assets/visa.svg'
import mc from '../../assets/mc.svg'
import mir from '../../assets/mir.svg'

export const Footer = () => {
	return (
		<footer className="Footer">
			<div className="container">
				<div className="Footer__in">
					<div className="Footer__main">
						<Link to={'/'} className='Footer__main_item Footer__main_logo'>
							<img src={logo} alt='Telier'></img>
						</Link>
						<div className="Footer__main_item Footer__main_part">
							<h3 className="Footer__main_part_head">Покупателям</h3>
							<ul className="Footer__main_part_list">
								<li className="Footer__main_part_item"><Link to={'/help'}>Как сделать заказ</Link></li>
								<li className="Footer__main_part_item"><Link to={'/help'}>Способы оплаты</Link></li>
								<li className="Footer__main_part_item"><Link to={'/help'}>Доставка</Link></li>
								<li className="Footer__main_part_item"><Link to={'/help'}>Возврат товара</Link></li>
							</ul>
						</div>
						<div className="Footer__main_item Footer__main_part">
							<h3 className="Footer__main_part_head">Партнерам</h3>
							<ul className="Footer__main_part_list">
								<li className="Footer__main_part_item"><Link to={'/sale-with-us'}>Продавайте на Telier</Link></li>
								<li className="Footer__main_part_item"><Link to={'/for-carriers'}>Перевозчикам</Link></li>
								<li className="Footer__main_part_item"><Link to={'/open-pwz'}>Откройте пункт выдачи</Link></li>
								<li className="Footer__main_part_item"><Link to={'/franchise-pwz'}>Франшизный пункт выдачи</Link></li>
							</ul>
						</div>
						<div className="Footer__main_item Footer__main_part">
							<h3 className="Footer__main_part_head">Помощь</h3>
							<ul className="Footer__main_part_list">
								<li className="Footer__main_part_item"><Link to={'/ho'}>Как сделать заказ</Link></li>
								<li className="Footer__main_part_item"><Link to={'/delivery'}>Доставка</Link></li>
								<li className="Footer__main_part_item"><Link to={'/payment'}>Оплата</Link></li>
								<li className="Footer__main_part_item"><Link to={'/contacts'}>Контакты</Link></li>
								<li className="Footer__main_part_item"><Link to={'/safety'}>Безопасность</Link></li>
							</ul>
						</div>
						<div className="Footer__main_item Footer__main_part">
							<h3 className="Footer__main_part_head">Компания</h3>
							<ul className="Footer__main_part_list">
								<li className="Footer__main_part_item"><Link to={'/about'}>О нас</Link></li>
								<li className="Footer__main_part_item"><Link to={'/about'}>Реквизиты</Link></li>
								<li className="Footer__main_part_item"><Link to={'/about'}>Контакты</Link></li>
							</ul>
						</div>
						<div className="Footer__main_item Footer__main_part">
							<h3 className="Footer__main_part_head">Мы в соц.сетях</h3>
							<ul className="Footer__main_part_list">
								<li className="Footer__main_part_item"><a href="https://www.facebook.com/" target={'_blank'}>Facebook</a></li>
								<li className="Footer__main_part_item"><a href="https://twitter.com/" target={'_blank'}>Twitter</a></li>
								<li className="Footer__main_part_item"><a href="https://www.youtube.com/" target={'_blank'}>YouTube</a></li>
								<li className="Footer__main_part_item"><a href="https://www.instagram.com/" target={'_blank'}>Instagram</a></li>
							</ul>
						</div>
					</div>
					<div className="Footer__ex">
                        <div className="Footer__ex_copy">© Telier. Все права защищены.</div>
                        <div className="Footer__ex_pm">
                            <div className="Footer__ex_pm_item"><img src={visa} alt="Visa" /></div>
                            <div className="Footer__ex_pm_item"><img src={mc} alt="MasterCard" /></div>
                            <div className="Footer__ex_pm_item"><img src={mir} alt="Mir" /></div>
                        </div>
                    </div>
				</div>
			</div>
		</footer>
	)
}