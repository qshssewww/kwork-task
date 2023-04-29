import { EmptyList } from "../placeholders/EmptyList/EmptyList"
import { Product } from "../Product/Product"

export const List = ({ list, title, link, icon }) => {

	return (
		<div className="List">
			<div className="container">
				<div className="List__in">
					<div className="List__head">
						<h2 className="List__head_title section__title">{title}</h2>
						{
							link ? (
								<a href="#" className="List__head_link">Показать все</a>
							) : null
						}
					</div>
					<div className="List__body">
						{
							list && list.length > 0 ? (
								list.map((item, index) => (
									<div className="List__body_item" key={index}>
										<Product
											id={item.id}
											name={item.name}
											discount={item.discount}
											price={item.price}
											get_sale={item.get_sale}
											is_published={item.is_published}
											images={item.images}
										/>
									</div>
								))
							) : <EmptyList icon={icon} text={'Тут пусто'} />
						}
					</div>
				</div>
			</div>
		</div>
	)
}