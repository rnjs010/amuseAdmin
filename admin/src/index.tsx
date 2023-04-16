import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import NotFound from './pages/NotFound';
import DashBoard from './pages/DashBoard';
import ProductDelete from './pages/ProductDelete';
import ProductCreate from './pages/ProductCreate';
import ManipulateCategory from './pages/ManipulateCategory'
import RegisterAd from './pages/RegisterAd'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {index: true, element: <DashBoard/>},
            {path: 'product/create', element: <ProductCreate/>},
            {path: 'product/delete', element: <ProductDelete/>},
            {path: '/manipulateCategory', element: <ManipulateCategory/>},
            {path: '/registerAd', element: <RegisterAd/>}
        ]
    }
])

ReactDOM.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
    document.getElementById('root'),
);

