import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMeassge/errorMessage';

import "./singleComicPage.scss";

import { useParams, Link } from 'react-router-dom';

const SingleComicPage = () => {

    const {comicId} = useParams();
    console.log(comicId);
    const [comic, setComic] = useState(null);

    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId]);


    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const updateComic = () => {
        clearError();

        getComic(comicId)
            .then(onComicLoaded) 
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMess = error ? <ErrorMessage/> : null;
    const view = !(error || loading || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            {spinner}
            {errorMess}
            {view}
        </>
    )
}

const View = ({comic: {name, description, prices, pages, language, thumbnail}}) => {
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
                <div className="singlecomic__pages">
                    {pages} pages
                </div>
                <div className="singlecomic__lang">
                    Language: {language}
                </div>
                <div className="singlecomic__price">
                    {prices}$
                </div>
            </div>
        </div>
    )
}

export default SingleComicPage;