export const IconButton = ({icon, active, onClick, type, variant, disabled}) => {

    const variantSwitch = () => {
        switch(variant) {
            case 'like':
                return 'like'
            case 'danger':
                return 'danger'
            default:
                return ''
        }
    }


    return (
        <button type={type} onClick={onClick} className={"IconButton " + variantSwitch() + (active ? ' active ' : '')} disabled={disabled}>
            {icon}
        </button>
    )
}