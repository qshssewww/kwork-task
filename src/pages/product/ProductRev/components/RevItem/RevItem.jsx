import moment from 'moment/moment';
import 'moment/locale/ru';

import { Rating } from '../../../../../components/Rating/Rating';

export const RevItem = ({
	avatar,
	username,
	rating,
	text,
	date,
	openLogin,
	id,
	productId
}) => {
	
	const dataSlice = date.slice(0, -9)

	return (
		<div className="RevItem">
			<div className="RevItem__head">
				<div className="RevItem__head_profile">
					<div className="RevItem__head_profile_avatar">
						{
							avatar ? (
								<img src={avatar} alt='' />
							) : (
								username.slice(0, 1)
							)
						}
					</div>
					<div className="RevItem__head_profile_bd">
						<div className="RevItem__head_profile_username">{username}</div>
						<div className="RevItem__head_profile_rate">
							<Rating value={rating} />
						</div>
					</div>
				</div>
				<div className="RevItem__head_date">
					{
						// console.log(date.slice(0, -9))
						moment(dataSlice, 'DD.MM.YYYY, hh:mm:ss').locale('ru').format('D MMMM YYYY')
					}
				</div>
			</div>
			<div className="RavItem__body">
				<div className="RevItem__body_text">
					{text}
				</div>
			</div>
		</div>
	)
}