import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import NotFound from './pages/NotFound';
import DashBoard from './pages/DashBoard';
import ProductDelete from './pages/ProductDelete';
import ProductCreate from './pages/ProductCreate';
import ProductEdit from './components/Product/ProductEdit/ProductEdit';

import ComponentManage from "./pages/ComponentManagePages/ComponentManage"

import Category from "./pages/CategoryPages/Category";
import CategoryDetail from "./pages/CategoryPages/CategoryDatail";
import CategoryRegister from "./pages/CategoryPages/CategoryRegister";

import HashTag from "./pages/HashTagPages/HashTag";
import HashTagDetail from "./pages/HashTagPages/HashTagDetail";
import HashTagRegister from "./pages/HashTagPages/HashTagRegister";

import Ad from './pages/AdPages/Ad';
import AdDetail from './pages/AdPages/AdDetail';
import AdRegister from "./pages/AdPages/AdRegister";

import Notice from "./pages/NoticePages/Notice";
import NoticeDetail from "./pages/NoticePages/NoticeDetail";
import NoticeRegister from "./pages/NoticePages/NoticeRegister";

import StaffDetail from "./pages/StaffPages/StaffDetail";
import MainPageComponentAdd from "./pages/ComponentManagePages/MainPageComponentAdd";
import MainPageComponentDetail from "./pages/ComponentManagePages/MainPageComponentDetail";
import ProductManage from './components/Product/ProductManage/ProductManage';
import ProductStatus from './components/Product/ProductStatus/ProductStatus';
import Component from "./pages/ComponentEditingPages/Component";
import Page from "./pages/PageEditingPages/Page";
import ListComponentRegister from "./pages/ComponentEditingPages/ListComponentRegister";
import BannerComponentRegister from "./pages/ComponentEditingPages/BannerComponentRegister";
import TileComponentRegister from "./pages/ComponentEditingPages/TileComponentRegister";
import PageDetail from "./pages/PageEditingPages/PageDetail";
import ListComponentDatail from "./pages/ComponentEditingPages/ListComponentDatail";
import BannerComponentDetail from "./pages/ComponentEditingPages/BannerComponentDetail";
import TileComponentDetail from "./pages/ComponentEditingPages/TileComponentDetail";
import ProductCopy from './components/Product/ProductCopy/ProductCopy';
import PageRegister from "./pages/PageEditingPages/PageRegister";
import ManagerDetail from './pages/ManagerPages/ManagerDetail';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {index: true, element: <DashBoard/>},
            {path: 'product', element: <ProductManage/>},
            {path: 'product/status', element: <ProductStatus/>},
            {path: 'product/create', element: <ProductCreate/>},
            {path: 'product/delete', element: <ProductDelete/>},
            {path: 'product/edit/:productId', element: <ProductEdit/>},
            {path: 'product/copy/:productId', element: <ProductCopy/>},
            
            {path: '/component', element: <ComponentManage/>},
            {path: '/component/mainpage', element: <MainPageComponentAdd/>},
            {path: '/component/mainpage/:id', element: <MainPageComponentDetail/>},
            
            // TODO: Deprecated
            {path: '/category', element: <Category/>},
            {path: '/category/:id', element: <CategoryDetail/>},
            {path: '/category/register', element: <CategoryRegister/>},
            
            {path: '/hashtag', element: <HashTag/>},
            {path: '/hashtag/:id', element: <HashTagDetail/>},
            {path: '/hashtag/register', element: <HashTagRegister/>},
            
            {path: '/ad', element: <Ad/>},
            {path: '/ad/:id', element: <AdDetail/>},
            {path: '/ad/register', element: <AdRegister/>},
            
            {path: '/notice', element: <Notice/>},
            {path: '/notice/:id', element: <NoticeDetail/>},
            {path: '/notice/register', element: <NoticeRegister/>},
            
            //가이드 관리
            {path: '/staff', element: <StaffDetail/>},
            // 권한 관리
            {path: '/manager', element: <ManagerDetail/>},
            
            {path: '/componentv2', element: <Component/>},
            
            {path: '/componentv2/listcomponent/register', element: <ListComponentRegister/>},
            {path: '/componentv2/listcomponent/:id', element: <ListComponentDatail/>},
            
            {path: '/componentv2/bannercomponent/register', element: <BannerComponentRegister/>},
            {path: '/componentv2/bannercomponent/:id', element: <BannerComponentDetail/>},
            
            {path: '/componentv2/tilecomponent/register', element: <TileComponentRegister/>},
            {path: '/componentv2/tilecomponent/:id', element: <TileComponentDetail/>},
            
            
            
            {path: '/page', element: <Page/>},
            {path: '/page/:id', element: <PageDetail/>},
            {path: '/page/register', element: <PageRegister/>}
        ]
    }
])

ReactDOM.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
    document.getElementById('root'),
);

