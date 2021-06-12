import React, { FC } from 'react';
import { Route } from 'react-router-dom';
import Bibliography from '../pages/Bibliography';
import GradeCalculator from '../pages/GradeCalculator';
import Login from '../pages/Login';
import Notes from '../pages/Notes';
import Signup from '../pages/Signup';
import CiteWebsite from './bibliography-components/CiteWebsite';
import ManualCitation from './bibliography-components/ManualCitation';

export interface RoutesProps {}

const Routes: FC<RoutesProps> = () => {
    return (
        <>
            <Route exact path="/notes" component={Notes} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/grade-calculator" component={GradeCalculator} />
            <Route exact path="/create-bibliography" component={Bibliography} />
            <Route
                exact
                path="/create-bibliography/cite-website"
                component={CiteWebsite}
            />
            <Route
                exact
                path="/create-bibliography/cite-website/manual-citation"
                component={ManualCitation}
            />
        </>
    );
};

export default Routes;
