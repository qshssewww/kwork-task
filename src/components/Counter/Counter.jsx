import { MinusOutlined, PlusOutlined } from "@ant-design/icons"

export const Counter = ({ value, addFunc, removeFunc }) => {

	const removeHandle = () => {
		if (value == 1) {
			return
		} else {
			removeFunc()
		}
	}

	return (
		<div className="Counter">
			<button onClick={removeHandle} className="Counter__btn"><MinusOutlined /></button>
			<input type='text' className="Counter__value" value={value} readOnly />
			<button onClick={addFunc} className="Counter__btn"><PlusOutlined /></button>
		</div>
	)
}