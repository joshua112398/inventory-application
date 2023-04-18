import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import Characters from './routes/characters';
import Weapons from './routes/weapons';
import Visions from './routes/visions';
import DetailPage from './routes/detailpage';
import ErrorPage from './error-page';
import './styles/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'characters',
        element: <Characters />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'characters/:id',
        element: <DetailPage group="characters" />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'weapons',
        element: <Weapons />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'weapons/:id',
        element: <DetailPage group="weapons" />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'visions',
        element: <Visions />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
