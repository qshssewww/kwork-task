import { Product } from '../../../../components/Product/Product';
import { EmptyList } from '../../../../components/placeholders/EmptyList/EmptyList';

export const FilterList = ({ list }) => {

	return (
		<div className="FilterList">
			{
				list && list.length > 0 ? (
					list.map((item, index) => (
						<div className="FilterList__item" key={index}>
							<Product
								id={item.id}
								name={item.title}
								discount={item.discount}
								price={item.price}
								get_sale={item.get_sale}
								is_published={item.is_published}
								images={item.images[0].image_urls}
							/>
						</div>
					))
				) : <EmptyList />
			}
		</div>
	)
}