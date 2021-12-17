import { useState } from "react";

import AppCharacterList from "../appCharacterList/appCharacterList";
import AppDetails from "../appDetails/appDetails";
import RandomChar from "../appRandom/appRandom";
import ErrorBoundary from "../errorBoundary/errorBoundary";

import redMan from '../../resources/img/redMan.svg';

const MainPage = (props) => {

    const [selectedChar, setChar] = useState(null); 

    const onCharSelected = (id) => {
        setChar(id)
    }

    return (
        <>  
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>

            <div className="app__body">
                <ErrorBoundary>
                    <AppCharacterList match={props.match} onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <AppDetails charId={selectedChar}/>
                </ErrorBoundary>
            </div>
            <img className="app__image" src={redMan} alt="red man" />
        </>
    )
}

export default MainPage;