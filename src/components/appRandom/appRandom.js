import { useState, useEffect } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMeassge/errorMessage';
import useMarvelService from '../../services/MarvelService'; 

import mjolnir from '../../resources/img/mjolnir.svg';
import shield from '../../resources/img/shield.svg'
import './appRandom.scss';

const RandomChar = () => {

    const [char, setChar] = useState({});

    const {loading, error, getCharacter, clearError} = useMarvelService();

    // console.log("Персонаж:", char, "Загрузка: ", loading, "Ошибка: ", error);

    useEffect(() => {
        updateChar();

        // const timerId = setInterval(updateChar, 60000);

        return () => {
            // clearInterval(timerId);
        }
    }, []); 

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError()
        let id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        getCharacter(id)
            .then(onCharLoaded)
    }


    const errorMess = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const view = !(error || loading || !char) ? <View char={char}/> : null;

    return (
        <div className="randomchar">
            {errorMess}
            {spinner}
            {view}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button 
                    className="button randomchar__btn"
                    onClick={updateChar}>
                    try it
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                <img src={shield} alt="shield" className="randomchar__shield"/>
            </div>
        </div>
    )
}

const View = ({char: {name, description, thumbnail, homepage, wiki}}) => {
    let classContain;

    if (thumbnail) {
        classContain = thumbnail.match(/_not_/g) ? {objectFit: 'contain'} : null;
    }

    return (
        <div className="randomchar__block">
            <img style={thumbnail ? classContain : null} src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button_grey">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;