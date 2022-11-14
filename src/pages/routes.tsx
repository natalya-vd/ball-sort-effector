import { RouteObject } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Error404Page } from './error404/Error404';
import { HomePage } from './home/HomePage';

export const ROUTES: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '*',
        element: <Error404Page />,
      },
    ],
  },
];
