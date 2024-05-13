import { Context } from '../main.tsx'
import { useContext } from 'react'

export const useStore = () => {
   const context = useContext(Context)
   return context
}
