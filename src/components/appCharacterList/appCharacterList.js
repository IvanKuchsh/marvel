import { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group'
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMeassge/errorMessage'
import AppCharacterListItem from '../appCharListItem/appCharListItem';
import useMarvelService from '../../services/MarvelService'; 
import { withRouter } from "react-router";
import PropTypes from 'prop-types';

import './appCharacterList.scss';

const AppCharacterList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();
    
    const refList = [];
    const {match} = props;

    useEffect(() => {
        updateCharList(offset, true)
    }, []);

    const updateCharList = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)  

        getAllCharacters(offset) 
            .then(onUpdateCharList)
    }

    const onUpdateCharList = (newCharList) => {
        setNewItemLoading(false);
        if (newCharList) {
            let ended = false;
    
            if (newCharList && newCharList.length < 9) {
                ended = true
            }
    
            setCharList((charList) => [...charList, ...newCharList]);
            setOffset(offset => offset + 9);
            setCharEnded(ended)
        }
    }

    const renderItems = (charList) => {
        const elements = charList.map((item, index) => {
            return <CSSTransition 
                key={item.id}
                in={match != null ? true : console.log(match)}
                timeout={300}
                classNames="character__item"
                unmountOnExit
                >
                    <AppCharacterListItem 
                        refList={refList}
                        {...item}
                        index={index}
                        onCharSelected={() => props.onCharSelected(item.id)}/>
                    </CSSTransition> 
        });

        return (
            <ul className="character__wrapper">
                {elements}
            </ul>
        )
    }

    const items = renderItems(charList);

    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    const errorBlock = error && charList.length === 0 ? <ErrorMessage/> : null;

    return (
        <div className="character">
            {spinner}
            {errorBlock}
            {items}
            <button 
                className="character__button button button_long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => updateCharList(offset)}>
                    load more
            </button>
        </div>
    )
}

AppCharacterList.propTypes = {
    onCharSelected: PropTypes.func
}

AppCharacterList.defaultProps = {
    onCharSelected: () => {}
}

export default AppCharacterList;