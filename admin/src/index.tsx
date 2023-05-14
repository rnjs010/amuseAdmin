import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import NotFound from './pages/NotFound';
import DashBoard from './pages/DashBoard';
import ProductDelete from './pages/ProductDelete';
import ProductCreate from './pages/ProductCreate';

import Category from "./pages/CategoryPages/Category";
import CategoryDetail from "./pages/CategoryPages/CategoryDatail";
import CategoryRegister from "./pages/CategoryPages/CategoryRegister";

import HashTag from "./pages/HashTagPages/HashTag";
import HashTagRegister from "./pages/HashTagPages/HashTagRegister";
import HashTagDetail from "./pages/HashTagPages/HashTagDetail";

import Ad from './pages/AdPages/Ad';
import AdDetail from './pages/AdPages/AdDetail';
import AdRegister from "./pages/AdPages/AdRegister";

import Notice from "./pages/NoticePages/Notice";
import NoticeRegister from "./pages/NoticePages/NoticeRegister";
import NoticeDetail from "./pages/NoticePages/NoticeDetail";

import StaffDetail from "./pages/StaffDetail";



const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {index: true, element: <DashBoard/>},
            {path: 'product/create', element: <ProductCreate/>},
            {path: 'product/delete', element: <ProductDelete/>},
            
            // TODO: Deprecated
            {path: '/category', element: <Category/>},
            {path: '/category/:id', element: <CategoryDetail/>},
            {path: '/category/register', element: <CategoryRegister/>},
            
            {path: '/hashtag', element: <HashTag/>},
            {path: '/hashtag/register', element: <HashTagRegister/>},
            {path: '/hashtag/:id', element: <HashTagDetail/>},
            
            {path: '/ad', element: <Ad/>},
            {path: '/ad/:id', element: <AdDetail/>},
            {path: '/ad/register', element: <AdRegister/>},
            
            {path: '/notice', element: <Notice/>},
            {path: '/notice/register', element: <NoticeRegister/>},
            {path: '/notice/:id', element: <NoticeDetail/>},
            
            {path: '/staff/:id', element: <StaffDetail/>}
        ]
    }
])

ReactDOM.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
    document.getElementById('root'),
);

