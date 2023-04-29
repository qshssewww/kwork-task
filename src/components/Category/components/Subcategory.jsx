import { Link } from "react-router-dom"

export const Subcategory = ({ list, index }) => {
	return (
		<div className="Subcategory">
			<div className="Subcategory__in">
				<div className="Subcategory__in_list">
					{
						list && list.length > 0 ? (

							<div className="Subcategory__in_list_item" key={index}><Link to={`/catalog/${list}`}>{list}</Link></div>

						) : 'dsdsa'
					}
				</div>
			</div>
		</div>
	)
}
