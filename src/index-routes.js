import React from 'react';
import Recommend from './routes/Recommend'
import Singer from './routes/Singer'

const routes = [
    { 
        path: '/',
        exact: true,
        main: () => <Recommend />
    },
    { 
        path: '/singer',
        main: () => <Singer />
    },
    { 
        path: '/rank',
        main: () => <div style={{backgroundColor: "blue"}}><h2>rank</h2></div>
    },
    { 
        path: '/search',
        main: () => <div style={{backgroundColor: "pink"}}><h2>search</h2></div>
    }
]

export default routes;