import './appComics.scss';

const AppComics = ({comics}) => {

    const comicsItems = comics.slice(0, 10);

    const comicsItem = comicsItems.map(({name}, i) => {
        return (
            <li key={i}
                className="comics__item">
                    {name}
            </li>
        )
    })

    return (
        <div className="comics">
            <h3 className="comics__title">Comics:</h3>
            <ul className="comics__items">
                {comics.length > 0 ? null : "Комиксы отсутствуют с этим персонажем"}
                {comicsItem}
            </ul>
        </div>
    )
}

export default AppComics;