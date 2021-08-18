import { useToast } from '@chakra-ui/react';
import React, { FC } from 'react';
import { Route } from 'react-router-dom';
import firebase, { messaging } from '../firebase';
import Bibliography from '../pages/Bibliography';
import GradeCalculator from '../pages/GradeCalculator';
import Homepage from '../pages/Hompage';
import Login from '../pages/Login';
import Notes from '../pages/Notes';
import Quiz from '../pages/Quiz';
import Schedule from '../pages/Schedule';
import Signup from '../pages/Signup';
import CiteWebsite from './bibliography-components/CiteWebsite';
import ManualCitation from './bibliography-components/ManualCitation';

export interface RoutesProps {}

const Routes: FC<RoutesProps> = () => {
    const toast = useToast();
    if (firebase.messaging.isSupported())
        messaging?.onMessage((message) => {
            toast({
                title: message.notification.title,
                description: message.notification.body,
                status: 'info',
                duration: 9000,
                isClosable: true,
            });
        });
    return (
        <>
            <Route exact path="/" component={Homepage} />
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
            <Route
                exact
                path="/create-bibliography/cite-website/manual-citation/edit:index"
                component={ManualCitation}
            />
            <Route exact path="/schedule" component={Schedule} />
            <Route exact path="/quizzes" component={Quiz} />
        </>
    );
};

export default Routes;
