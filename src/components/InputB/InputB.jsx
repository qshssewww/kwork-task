import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons"
import { Input } from "antd"

export const InputB = ({
	name,
	placeholder,
	type,
	prefix,
	label,
	onChange,
	onBlur,
	value,
	error,
	pattern,
	required
}) => {

	return (
		<div className="InputB">
			<div className="InputB__label">
				{label}
			</div>
			{
				type == 'password' ? (
					<Input.Password 
				status={error ? 'error' : false}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				className='InputB__el'
				prefix={prefix}
				placeholder={placeholder}
				type={type}
				name={name}
				iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
			/>
				) : (
					<Input 
				status={error ? 'error' : false}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				className='InputB__el'
				prefix={prefix}
				placeholder={placeholder}
				type={type}
				name={name}
			/>
				)
			}
			<div className="InputB__error">
				{error}
			</div>
		</div>
	)
}