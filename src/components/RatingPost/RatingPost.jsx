import { BsStar, BsStarFill } from 'react-icons/bs';

const stars = [1, 2, 3, 4, 5];

export const RatingPost = ({ value, selecValue }) => {
	return (
		stars.map((item, index) => (
			<div className="RatingPost__item" onClick={() => selecValue(index + 1)} key={index}>
				{
					index < value ? (
						<BsStarFill />
					) : (
						<BsStar />
					)
				}
			</div>
		))
	)
}