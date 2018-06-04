import React from 'react';
import DefaultLayout from './layouts';
import SingerDetail from './routes/SingerDetail';
import HappyBirthday from './routes/HappyBirthday';

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