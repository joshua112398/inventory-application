import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import Characters from './routes/characters';
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
        element: <DetailPage type="character" />,
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
