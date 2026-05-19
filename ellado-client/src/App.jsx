import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';

// HomePage Structure
import Layout from './layouts/Layout';
import ArticlePage from './pages/LandingPages/ArticlePage';
import HomePage from './pages/LandingPages/HomePage';
import AboutPage from './pages/LandingPages/AboutPage';
import ArticleListPage from './pages/LandingPages/ArticleListPage';

import AuthLayout from './layouts/AuthLayout';
import SignInPage from './pages/AuthPages/SignInPage';
import SignUpPage from './pages/AuthPages/SignUpPage';

import NotFoundPage from './pages/NotFoundPage';

import DashLayout from './layouts/DashLayout';
import DashboardPage from './pages/DashboardPages/DashboardPage';
import ReportsPage from './pages/DashboardPages/ReportsPage';
import UsersPage from './pages/DashboardPages/UsersPage';

import DashArticleListPage from './pages/DashboardPages/DashArticleListPage';

// Must be logged in
const RequireAuth = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/auth/signin" replace />;
};

// Role-based access control
const RequireRole = ({ allowedRoles }) => {
  const type = localStorage.getItem("type");

  if (!type) return <Navigate to="/auth/signin" replace />;
  if (!allowedRoles.includes(type)) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
};

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/about',
        element: <AboutPage />
      },
      {
  path: '/articles',
  element: <ArticleListPage />
},
{
  path: '/articles/:slug',
  element: <ArticlePage />
},
    ],
  },

  {
    path: 'auth/',
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: 'signin',
        element: <SignInPage />
      },
      {
        path: 'signup',
        element: <SignUpPage />
      }
    ],
  },

  {
  path: 'dashboard',
  element: <RequireAuth />,
  children: [
    {
      element: <DashLayout />,
      children: [
        {
          index: true,
          element: <DashboardPage />,
        },
        {
          path: 'reports',
          element: <ReportsPage />,
        },
        {
          path: 'articles',
          element: <DashArticleListPage />,
        },
        {
          element: <RequireRole allowedRoles={["admin"]} />,
          children: [
            {
              path: 'users',
              element: <UsersPage />,
            }
          ]
        }
      ]
    }
  ]
}
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;