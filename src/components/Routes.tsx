import React, { FC } from 'react';
import { Route } from 'react-router-dom';
import GradeCalculator from '../pages/GradeCalculator';
import Login from '../pages/Login';
import Notes from '../pages/Notes';
import Signup from '../pages/Signup';

export interface RoutesProps {}

const Routes: FC<RoutesProps> = () => {
    return (
        <>
            <Route exact path="/notes" component={Notes} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/grade-calculator" component={GradeCalculator} />
        </>
    );
};

export default Routes;
