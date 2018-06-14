import React from 'react';
import DefaultLayout from './layouts';
import SingerDetail from './routes/SingerDetail';

const routes = [
    { 
        path: '/singer/:id',
        main: () => <SingerDetail />
    },
    { 
        path: '/',
        main: () => <DefaultLayout />
    }
]

export default routes;