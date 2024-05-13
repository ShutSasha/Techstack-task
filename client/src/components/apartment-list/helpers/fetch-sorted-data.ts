import { Dispatch, SetStateAction } from 'react'
import $api from '../../../http'
import { Apartment } from '../../../models/apartment'
import { handleFetchError } from '../../../app/helpers/functions'
import Store from '../../../app/store/store'

export const fetchSortedData = async (
   sortValue: string,
   filterValue: string,
   setRoomOptions: Dispatch<SetStateAction<{ value: number; label: string }[]>>,
   setSort: Dispatch<SetStateAction<string>>,
   setFilter: Dispatch<SetStateAction<string>>,
   store: Store,
) => {
   try {
      const { data } = await $api.get<Apartment[]>('/apartments', {
         params: {
            price: sortValue === 'none' ? undefined : sortValue,
            rooms: filterValue === 'all' ? undefined : filterValue,
         },
      })
      store.setApartments(data)
      if (sortValue === 'none' && filterValue === 'all') {
         setRoomOptions(
            Array.from(new Set(data.map((a) => a.rooms))).map((room) => ({
               value: room,
               label: `${room} room${room > 1 ? 's' : ''}`,
            })),
         )
      }
   } catch (e) {
      handleFetchError(e)
      setSort('none')
      setFilter('all')
   }
}
