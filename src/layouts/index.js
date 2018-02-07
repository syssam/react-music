import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Header from '../components/Header';
import routes from '../indexRoutes';
import './index.css';

const Fade = (props) => {
    const { location } = props;
    return (
        <TransitionGroup appear>
            <CSSTransition
                classNames="fade"
                key={location.key}
                timeout={{ enter: 150, exit: 0 }}
            >
                {props.children}
            </CSSTransition>
        </TransitionGroup>
    );
};

const DefaultLayout = (props) => {
    return (
        <div className="default-layout">
            <Header />
            <ul className="tabs">
                <li className="tab-item"><NavLink exact to="/">推荐</NavLink></li>
                <li className="tab-item"><NavLink to="/singer">歌手</NavLink></li>
                <li className="tab-item"><NavLink to="/rank">排行</NavLink></li>
                <li className="tab-item"><NavLink to="/search">搜索</NavLink></li>
            </ul>
            <Route
            render={({ location }) => (
              <Fade location={location}>
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
            </Fade>
            )} />
        </div>
    )
}

export default DefaultLayout