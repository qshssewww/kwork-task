import { Modal, message } from "antd"
import { useSelector } from "react-redux";
import { Input } from "antd";
import { useState } from "react";

import { RatingPost } from '../../../components/RatingPost/RatingPost';
import { Button } from "../../../components/Button/Button";
import { dataService } from "../../../services/dataService";

const { TextArea } = Input;
const ds = new dataService();

export const AddRev = ({ showModal, close, product, updateList }) => {
	const { token, userData } = useSelector(state => state.mainReducer);

	const [star, setStar] = useState(0);
	const [text, setText] = useState('');
	const [load, setLoad] = useState(false);

	// console.log(product + 'fadsfdfsfsfd')

	const closeHandle = () => {
        setStar(0)
        setText('')
        close();
    }

	const handleText = (e) => {
        setText(e.target.value)
    }

	const handleSubmit = () => {
		const data = {
			'star': star,
			'product': product,
			'text': text,
			'user': userData.id
		}
		
        setLoad(true)
        ds.addRevs(token, data).then(res => {
            updateList()
            
        }).finally(_ => {
            setLoad(false)
            closeHandle()
            message.success(' Благодарим вас за вашу оценку')
        })
	
	}

	return (
		<Modal width={500} className="modal AddRev" open={showModal} onCancel={closeHandle}>
			<h2 className="modal__head">Оставить отзыв</h2>
			<div className="modal__body">
				<div className="modal__body_row">
					<RatingPost selecValue={setStar} value={star} />
				</div>
				<div className="modal__body_row AddRev__int">
					<TextArea
						maxLength={500}
						onChange={handleText}
						value={text}
						style={{
							padding: 12,
							paddingBottom: 50,
							borderRadius: 6,
							borderColor: '#E8E8E8',
							resize: 'none',
							height: 140
						}} placeholder={"Ваш отзыв"} />
				</div>
			</div>
			{/* {
				prevs?.length > 0 ? (
					<div className="modal__body_row AddRev__prevs">
						{
							prevs.map((item, index) =>(
								<div className="AddRev__prevs_item" key={index}>

								</div>
							))
						}
					</div>
				)
			} */}
			<div className="modal__body_row" style={{ display: 'flex', justifyContent: 'center' }}>
				<Button disabled={star == 0 || !text} onClick={handleSubmit} text={'Отправить'} variant={'primary'} style={{ width: 'unset', paddingLeft: '30px', paddingRight: '30px' }} />
			</div>
		</Modal>
	)
}