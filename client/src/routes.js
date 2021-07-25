import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/login'
import Dashboard from './pages/dashboard';
import Brought from './pages/brought';

const Routes = (props) => {

    return <Switch>
                <Route exact path="/" render={() => (<Redirect to="/auth" />)} /> 
                <Route exact path="/auth" render={() => <Login />} />
                <Route exact path="/dashboard" render={() => <Dashboard/>}/>
                <Route exact path="/brought" render={() => <Brought/>}/>
            </Switch>;
};

export default Routes;
