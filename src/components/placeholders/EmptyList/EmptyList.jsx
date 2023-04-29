export const EmptyList = ({text, icon}) => {
    return (
        <div className="EmptyList">
            <div className="EmptyList__icon">{icon}</div>
            <div className="EmptyList__text">{text}</div>
        </div>
    )
}