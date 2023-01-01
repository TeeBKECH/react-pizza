import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from './store/store'
import { Provider } from 'react-redux'

import App from './components/App'

import Home from './pages/Home'
import Cart from './pages/Cart'
import ErrorPage from './pages/ErrorPage'
import PizzaPage from './pages/PizzaPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'cart/',
        element: <Cart />,
      },
      {
        path: 'pizza/:id',
        element: <PizzaPage />,
      },
    ],
  },
])

const rootElement = document.getElementById('root')

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  rootElement && root.render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  )
}
