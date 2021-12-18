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
                <Switch>
                    <Suspense fallback={<Spinner/>}>
                        <Route exact path="/">
                            <MainPage/>
                        </Route>
                        <Route exact path="/comics">
                            <ComicsPage/>
                        </Route>
                        <Route exact path="/comics/:comicId">
                            <SingleComicPage/>
                        </Route>
                        <Route exact path="/characters/:charId">
                            <SingleComicPage/>
                        </Route>
                        {/* <Route exact path="*">
                            <Page404/>
                        </Route> */}
                    </Suspense>
                </Switch>
            </div>
        </Router>
    )
}

export default App;