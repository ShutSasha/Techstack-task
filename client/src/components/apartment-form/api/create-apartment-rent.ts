import { handleFetchError } from '../../../app/helpers/functions'
import $api from '../../../http'

interface ICreateApartmentRent {
   name: string
   rooms: number
   price: number
   description: string
}

export const createApartmentRent = async (body: ICreateApartmentRent): Promise<boolean> => {
   try {
      await $api.post('/apartments', body)
      return true
   } catch (e) {
      handleFetchError(e)
      return false
   }
}
