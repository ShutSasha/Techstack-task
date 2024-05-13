import { RouterProvider } from 'react-router-dom'
import { router } from './pages/router'
import { Notice } from './components'
import { FC } from 'react'

export const App: FC = () => {
   return (
      <>
         <Notice />
         <RouterProvider router={router} />
      </>
   )
}
