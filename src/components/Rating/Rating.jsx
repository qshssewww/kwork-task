import { BsStar, BsStarFill } from "react-icons/bs"

const stars = [1,2,3,4,5]

export const Rating = ({value}) => {
	return (
		<div className="Rating">
			{
				stars.map((item, index) => (
					<div className="Rating__item" key={index}>
						{
							index < value ? (
								<BsStarFill />
							) : (
								<BsStar />
							)
						}
					</div>
				))
			}
		</div>
	)
}