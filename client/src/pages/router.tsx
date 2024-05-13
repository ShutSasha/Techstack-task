import { createBrowserRouter } from 'react-router-dom'
import { routes } from '../app/routes/consts'
import { Home } from './home'
import { NotFound } from './not-found'

export const router = createBrowserRouter(
   [
      {
         path: routes.HOME,
         element: <Home />,
      },
      {
         path: '*',
         element: <NotFound />,
      },
   ].map((route) => ({
      ...route,
      ErrorBoundary: NotFound,
   })),
)
