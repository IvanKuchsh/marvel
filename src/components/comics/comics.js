import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMeassge/errorMessage';
import useMarvelService from '../../services/MarvelService';

import './comics.scss';

const Comics = () => {

    const {loading, error, getAllComics} = useMarvelService();
    
    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(139);
    const [newItemsLoaded, setNewItemsLoaded] = useState(false);

    useEffect(() => {
        updateComics(offset, true);
    }, [])

    const updateComics = (offset, initalState) => {

        initalState ? setNewItemsLoaded(false) : setNewItemsLoaded(true);

        getAllComics(offset).then(res => {
            onUpdateComicsList(res);
            setOffset(offset => offset + 8);
        });
    }   

    const onUpdateComicsList = (comicsItems) => {
        setComics(comics => [...comics, ...comicsItems]);
        setNewItemsLoaded(false);
    }

    const renderItems = (items) => {
        const comicsList = items.map(({id, prices, name, role, thumbnail}, index) => {
            return (
                <li key={index} className="comicspage__item">
                    <Link to={`/comics/${id}`}>
                        <div className="comicspage__item-image">
                            <img src={thumbnail} alt="comics" />
                        </div>
                        <div className="comicspage__item-descr">
                            <div className="comicspage__item-title">
                                {name}: {role}
                            </div>
                            <div className="comicspage__item-price">{prices}$</div>
                        </div>
                    </Link>
                </li>
            );
        });

        return (
            <ul className="comicspage__items">
                {comicsList}
            </ul>
        )
    }
    
    const spinner = loading && !newItemsLoaded ? <Spinner/> : null;
    const errorMes = error ? <ErrorMessage/> : null;
    const items = renderItems(comics);

    return (
        <div className="comicspage">

            {spinner}
            {errorMes}
            {items}

            <button 
                onClick={() => updateComics(offset)} 
                className="comicspage__button button button_long"
                disabled={newItemsLoaded}>
                LOAD MORE
            </button>
        </div>
    )
}

export default Comics;