import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMeassge/errorMessage';

import "./singleComicPage.scss";

import { useParams, Link } from 'react-router-dom';

const SingleComicPage = () => {

    const {comicId, charId} = useParams();
    const [item, setItem] = useState(null);


    const {loading, error, getComic, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateItem();
    }, [comicId, charId]);


    const onItemLoaded = (item) => {
        setItem(item);
    }

    const updateItem = () => {
        clearError();

        if (comicId) {
            getComic(comicId)
                .then(onItemLoaded) 
        }

        if (charId) {
            getCharacter(charId)
                .then(onItemLoaded) 
        }

    }

    const spinner = loading ? <Spinner/> : null;
    const errorMess = error ? <ErrorMessage/> : null;
    const view = !(error || loading || !item) ? <View item={item} comicPage={comicId}/> : null;

    return (
        <>
            {spinner}
            {errorMess}
            {view}
        </>
    )
}

const View = ({item: {name, description, prices, pages, language, thumbnail}, comicPage}) => {
    return (
        <div className="singlecomic">
            <div className="singlecomic__image">
                <img src={thumbnail} alt={name} />
            </div>
            <div className="singlecomic__wrapper">
                <div className="singlecomic__header">
                    {name}
                    <Link to="/comics">Back to all</Link>
                </div>
                <div className="singlecomic__descr">
                    {description}
                </div>
                {comicPage ? <><div className="singlecomic__pages">
                    {pages} pages
                </div>
                <div className="singlecomic__lang">
                    Language: {language}
                </div>
                <div className="singlecomic__price">
                    {prices}$
                </div></> : null}
            </div>
        </div>
    )
}

export default SingleComicPage;