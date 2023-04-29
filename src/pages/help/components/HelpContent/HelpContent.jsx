export const HelpContent = ({title, text}) => {

    return (
        <div className="HelpContent">
            <h3 className="HelpContent__title">{title}</h3>
            <div className="HelpContent__body">
                <p>
                    {text}
                </p>
            </div>
        </div>
    )
}