import { LkMainItem } from './components/LkMainItem/LkMainItem';
import { LkAdr } from './components/LkAdr/LkAdr';
import { LkProds } from './components/LkProds/LkProds';
import { LkUserData } from './components/LkUserData/LkUserData';

export const LkMain = ({ data, ordFilter }) => {
	return (
		<div className="LkMain">
			<LkMainItem
				defaultOpen={true}
				name={'Личные данные'}
			>
				<LkUserData />
			</LkMainItem>
			<LkMainItem
				name={'Адреса доставки'}
			>
				<LkAdr />
			</LkMainItem>
			<LkMainItem
				name={'История заказов'}
			>
				{
					data && data.length > 0 ? (
						<LkProds data={data} ordFilter={ordFilter} />
					)
						: null
				}
			</LkMainItem>
		</div>
	)
}