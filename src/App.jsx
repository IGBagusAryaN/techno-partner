import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Login } from './components/pages/auth';
import { Fallback } from './components/fallback/fallback';
import { Toaster } from 'react-hot-toast';
import { Menu } from './components/pages/menu';
import Home from './components/pages/home';
import PrivateLayout from './components/layout/private-layout';

function App() {
  const router = createBrowserRouter([
    
    {
      path: '',
      element: <PrivateLayout />,
      children: [
        {
          path: '/',
          Component: Home,
          HydrateFallback: Fallback
        },
        {
          path: '/menu',
          Component: Menu,
          HydrateFallback: Fallback
        }
      ]
    },
    {
      path: '/login',
      Component: Login,
      HydrateFallback: Fallback
    },
  ])

  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App
