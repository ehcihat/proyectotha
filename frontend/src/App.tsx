import { useState } from 'react'
import Login from './pages/Login';
import Home from './pages/Home';
import Reports from './pages/Reports';
import ErrorPage from './pages/Errors';
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
  const router = createBrowserRouter([
    {
      path: '/',
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Login />
        },
        {
          path: 'home',
          element: <Home />
        },
        {
          path: 'reports',
          element: <Reports />
        }
      ]
    },
  ]);


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
