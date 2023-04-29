import { useState, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useRef } from 'react';



export const LkMainItem = ({
	defaultOpen,
	name,
	children,

}) => {
	const [bodyHeight, setBodyHeight] = useState(0)
	const [isOpen, setIsOpen] = useState(false)
	const bodyRef = useRef();

	const toggleHandle = () => [
		setIsOpen(!isOpen)
	]

	useEffect(() => {
		if (bodyRef?.current) {
			if (isOpen) {
				setBodyHeight(bodyRef.current.scrollHeight)
			} else {
				setBodyHeight(0)
			}
		}
	}, [isOpen, bodyRef])

	useEffect(() => {
		if (defaultOpen) {
			setIsOpen(true)
		} else {
			setIsOpen(false)
		}
	}, [defaultOpen])

	return (
		<div className={"LkMainItem" + (isOpen ? ' active ' : '')}>
			<div onClick={toggleHandle} className="LkMainItem__head">
				<div className="LkMainItem__head_name">{name}</div>
				<button className="LkMainItem__head_toggle">
					<FiChevronDown />
				</button>
			</div>
			<div className="LkMainItem__body" ref={bodyRef} style={{ height: isOpen ? bodyHeight : 0 }}>
				<div className="LkMainItem__body_in">
					{children}
				</div>
			</div>
		</div>
	)
}