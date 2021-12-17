import './skeleton.scss'

const Skeleton = () => {
    return (
        <div className="skeleton">
            <h3 className="skeleton__title">Please select a character to see information</h3>
            <div className="skeleton__wrapper">
                <div className="skeleton__header">
                    <div className="skeleton__img"></div>
                    <div className="skeleton__header-title"></div>
                </div>
                <div className="skeleton__item"></div>
                <div className="skeleton__item"></div>
                <div className="skeleton__item"></div>
            </div>
        </div>
    )
}

export default Skeleton;