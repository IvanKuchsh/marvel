import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMeassge/errorMessage';
import Skeleton from '../skeleton/skeleton';
import AppComics from '../appComics/appComics';

import './appDetails.scss';

const AppDetails = (props) => {

    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId]);


    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        const {charId} = props;

        if (!charId) {
            return;
        }

        clearError();

        getCharacter(charId)
            .then(onCharLoaded) 
    }


    const skeleton = char || loading || error ? null : <Skeleton/>
    const spinner = loading ? <Spinner/> : null;
    const errorMess = error ? <ErrorMessage/> : null;
    const view = !(error || loading || !char) ? <View char={char}/> : null;

    let clazzHeight = skeleton ? {height: '294px'} : {};

    return (
        <div style={clazzHeight} className="details">
            {skeleton}
            {spinner}
            {errorMess}
            {view}
        </div>
    )
}

const View = ({char: {name, thumbnail , homepage, wiki, description, comics}}) => {
    const classContain = thumbnail.match(/_not_/g) ? {objectFit: 'contain'} : {objectFit: 'cover'};
    return (
        <>
            <div className="details__header">
                <img style={classContain} src={thumbnail} alt={name} className="details__images" />
                <div className="details__header-wrapper">
                    <h3 className="details__title">{name}</h3>
                    <a href={homepage} className="button details__random-button">homepage</a>
                    <a href={wiki} className="button button_grey">wiki</a>
                </div>
            </div>
            <p className="details__text">
                {description}
            </p>
            <AppComics comics={comics}/>
        </>
    )
}

AppDetails.propTypes = {
    charId: PropTypes.number
}

export default AppDetails;