import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppHeader from "../appHeader/appHeader";
import Spinner from '../spinner/spinner';

import './app.scss'

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));

const App = () => {


    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <Suspense fallback={<Spinner/>}>
                    <Route exact path="/">
                        {({ match }) => (
                            <MainPage match={match}/>
                        )}
                    </Route>
                    <Route exact path="/comics" component={() => <ComicsPage/>}/>
                    <Route exact path="/comics/:comicId" component={() => <SingleComicPage/>}/>
                    {/* <Route exact path="*">
                        <Page404/>
                    </Route> */}
                </Suspense>
            </div>
        </Router>
    )
}

export default App;