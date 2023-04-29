import { Modal, Radio } from "antd"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "../../../../components/Button/Button"
import { dataService } from "../../../../services/dataService";
import { EmptyList } from "../../../../components/placeholders/EmptyList/EmptyList";

const ds = new dataService();

export const AddAdressModal = ({ open, closeModal, toggleModal, setSelectedOption }) => {
	const { token, userData } = useSelector(state => state.mainReducer)

	const [address, setAddress] = useState([]);

	const handleChangeModal = () => {
		toggleModal(true);
		closeModal();
	}

	const handleOptionChange = (event) => {
		setSelectedOption(event.target.value);
		setTimeout(() => {
			closeModal();
		}, 100)
	};

	useEffect(() => {
		if (userData) {
			ds.getAddress(token, userData.id).then(res => {
				setAddress(res)
			})
		}
	}, [userData])

	return (
		<Modal width={600} className="Auth" open={open} onCancel={closeModal}>
			<div className="popup__deliv">
				<div className="popup__deliv_title">
					Сохраненные адреса
				</div>
				<div className="popup__deliv_body">
					{
						address && address.length > 0 ? (
							address.map((item, index) => (
								<Radio.Group onChange={handleOptionChange} key={index}>
									<div className="popup__deliv_body_item">
										<Radio.Button value={item.address}>{item.address}</Radio.Button>
									</div>
								</Radio.Group>
							))
						) : <EmptyList text={'Вы еще не добавили адрес'} />
					}
				</div>
				<div className="popup__deliv_body_butt">
					<Button
						text={'Добавить новый адрес'}
						variant={'primary'}
						type={'submit'}
						onClick={handleChangeModal}
						round
					/>
				</div>
			</div>
		</Modal>
	)
}