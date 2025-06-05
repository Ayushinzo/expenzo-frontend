import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ContextProvider } from './Context/ContextProvider.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Auth from './pages/Auth'
import SignIn from './pages/SignIn'
import User from './pages/User'
import CompleteSignIn from './pages/CompleteSignIn'
import Authenticate from './Authenticate/Authenticate'
import Dashboard from './pages/Dashboard'
import Categories from './pages/Categories'
import Transactions from './pages/Transactions'
import ViewCategory from './pages/ViewCategory'
import Profile from './pages/Profile'
import Recurring from './pages/Recurring.jsx'
import Loader from './components/Loader.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    loader: Loader,
  },
  {
    path: '/auth',
    element: <Auth />,
    loader: Loader,
    children: [
      {
        path: 'sign-in',
        element: <SignIn />,
        loader: Loader,
      },
    ],
  },
  {
    path: '/complete-signIn',
    element: <CompleteSignIn />,
    loader: Loader,
  },
  {
    path: '/user',
    element: (
      <Authenticate>
        <User />
      </Authenticate>
    ),
    loader: Loader,
    children: [
      {
        index: true,
        path: 'dashboard',
        element: <Dashboard />,
        loader: Loader,
      },
      {
        path: 'categories',
        element: <Categories />,
        loader: Loader,
      },
      {
        path: 'transactions',
        element: <Transactions />,
        loader: Loader,
      },
      {
        path: 'categories/:id',
        element: <ViewCategory />,
        loader: Loader,
      },
      {
        path: 'recurring',
        element: <Recurring />,
        loader: Loader,
      },
      {
        path: 'profile',
        element: <Profile />,
        loader: Loader,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <RouterProvider router={router}>
    <ContextProvider>
      <App />
    </ContextProvider>
  </RouterProvider>
  // </StrictMode>,
)