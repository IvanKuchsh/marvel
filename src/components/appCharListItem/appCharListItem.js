import './appCharacterListItem.scss'

const AppCharacterListItem = ({thumbnail, name, onCharSelected, refList, index}) => {

    const onClickRef = (index) => {
        refList.forEach(item => item.classList.remove('character__item-active', 'character__item-focus'));
        refList[index].classList.add('character__item-active');
    }

    const onFocusRef = (index) => {
        refList.forEach(item => item.classList.remove('character__item-focus')); 
        refList[index].classList.add('character__item-focus');
    }

    return (
        <li 
            tabIndex="0"
            ref={(el) => refList[index] = el}
            className="character__item"
            onClick={() => {
                onCharSelected()
                onClickRef(index)
                }
            }
            onFocus={() => onFocusRef(index)}
            onKeyPress={(e) =>{
                if (e.key === "Enter" || e.key === " ") {
                    onCharSelected()
                    onClickRef(index)
                }
            }}>
            <div className="character__item-images">
                <img src={thumbnail} alt="" />
            </div>
            <div className="character__item-name">
                {name}   
            </div>
        </li>
    )
}

export default AppCharacterListItem;