import { SmileOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { EmptyList } from "../../../../components/placeholders/EmptyList/EmptyList";
import { BasketItem } from "../BasketItem/BasketItem";

export const BasketMain = () => {

	const { basket } = useSelector(state => state.mainReducer)
	const [selectedItems, setSelectedItems] = useState([]);

	const selectItem = (e) => {
        if(e.target.checked) {
            setSelectedItems(state => {
                return [...state, ]
            })
        }
    }

	return (
		<div className="BasketMain">
			<div className="BasketMain__list">
				{
					basket && basket.length > 0 ? (
						basket?.map((item, index) => (
							<div className="BasketMain__item" key={item.id}>
								<BasketItem 
									selectItem={selectItem}
									name={item.name}
									basketId={item.basketId} 
									id={item.id}
									images={item.images}
									price={item.price}
									get_sale={item.get_sale}
									discount={item.discount}
									quantity={item.quantity}
								/>
							</div>
						))
					) :  <EmptyList text={'В корзине пусто'} icon={<SmileOutlined/>}/>
				}
			</div>
		</div>
	)
}