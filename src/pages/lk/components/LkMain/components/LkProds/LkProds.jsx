import { Col, Row } from 'antd';
import { useEffect } from 'react';

import { Product } from '../../../../../../components/Product/Product';
import { EmptyList } from '../../../../../../components/placeholders/EmptyList/EmptyList';

export const LkProds = ({ data, prodStatus, ordFilter }) => {
	console.log(data)
	return (
		<div className="LkProds">
			<div className="LkProds__body">
				{
					data ? (
						data.map((itemone, index) => (
							itemone.product?.map((item, index) => (
								<div className="LkProds__body_cont">
									{
										itemone.status == ordFilter || ordFilter == undefined ? (
											<div className="LkProds__body_product" key={index}>
												<Product
													id={item.id}
													name={item.title}
													discount={item.discount}
													price={item.price}
													get_sale={item.get_sale}
													is_published={item.is_published}
													images={item.images[0].image_urls}
													lk={true}
													prodStatus={itemone.status}
												/> </div>) : null
									}
								</div>
							)
							))
						)
					) : <EmptyList text={'Тут пусто'} />
				}
			</div>
		</div>
	)
}
