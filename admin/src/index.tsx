import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import NotFound from './pages/NotFound';
import DashBoard from './pages/DashBoard';
import ProductDelete from './pages/ProductDelete';
import ProductCreate from './pages/ProductCreate';
import Category from './pages/Category';
import Ad from './pages/AdPages/Ad';
import EditAd from './pages/AdPages/EditAd';
import RegisterAd from "./pages/AdPages/RegisterAd";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {index: true, element: <DashBoard/>},
            {path: 'product/create', element: <ProductCreate/>},
            {path: 'product/delete', element: <ProductDelete/>},
            {path: '/category', element: <Category/>},
            {path: '/ad', element: <Ad/>},
            {path: '/ad/edit', element: <EditAd/>},
            {path: '/ad/register', element: <RegisterAd/>}
        ]
    }
])

ReactDOM.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
    document.getElementById('root'),
);

