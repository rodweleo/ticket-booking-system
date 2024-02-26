import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from './AuthProvider.tsx';
import { ErrorPage } from './pages/error/index.tsx';
import { Login } from './pages/authentication/Login.tsx';
import { Register } from './pages/authentication/Register.tsx';
import App from './App.tsx';
import { Tickets } from './pages/tickets/index.tsx';
import { Profile } from './pages/profile/index.tsx';
import { Events } from './pages/eventvista/admin/events/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "events",
        element: <Events />
      },
      {
        path: "tickets",
        element: <Tickets />
      },
      {
        path: "profile",
        element: <Profile />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
