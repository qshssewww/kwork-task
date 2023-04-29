import { useSelector } from "react-redux";
import { HashLoader } from 'react-spinners';

export const GlobalLoader = () => {
	const { globalLoad } = useSelector(state => state.mainReducer);

	return (
		<div className={"GlobalLoader " + (globalLoad ? 'active' : '')}>
			<div className="GlobalLoader__el">
				<HashLoader color="#fff" />
			</div>
		</div>
	)

}