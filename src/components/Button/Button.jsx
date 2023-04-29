import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export const Button = ({
	afterIcon,
	beforeIcon,
	text,
	disabled,
	variant,
	style,
	type,
	onClick,
	round,
	load
}) => {

	return (
		<button onClick={onClick} type={type ? type : ''} className={`Button ${variant ? variant : ''} ${round ? 'round' : ''} ${load ? 'load' : ''}`} disabled={disabled} style={style}>
			{
				load ? (
					<div className="Button_load">
						<Spin indicator={<LoadingOutlined style={{ color: '#fff' }} />} />
					</div>
				) : null
			}
			{
				beforeIcon ? (
					<span className="Button__side Button__before">{beforeIcon}</span>
				) : null
			}
			{
				text ? (
					<span className="Button__text">{text}</span>
				) : null
			}
			{
				afterIcon ? (
					<span className="Button__side Button__after">{afterIcon}</span>
				) : null
			}
		</button>
	)
}

