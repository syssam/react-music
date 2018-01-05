import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import routes from './routes';

const Router = () => {
    return (
        <Route
            path="/"
            render={({ location }) => (
            <Switch location={location} key={location.key}>
                {routes.map((route, index) => (
                    // Render more <Route>s with the same paths as
                    // above, but different components this time.
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    />
                ))}
            </Switch>
        )} />
    );
};

export default Router;