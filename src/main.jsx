import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import { Provider } from 'react-redux';
import store from './store';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import Dashboard from './pages/dashboard';
import AddRecipes from './pages/addRecipes';
import Detail from './pages/detail';
import EditRecipes from './pages/editRecipes';

const routes = [
  {
    path: "/",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/addRecipes",
    element: <AddRecipes />
  }, 
  {
    path: "/recipe/:recipe_id",
    element: <Detail />
  }, 
  {
    path: "/edit/:recipe_id",
    element: <EditRecipes />
  }
];
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>

  </React.StrictMode>,
);