import { FC } from 'react'
import { Apartment } from '../../../models/apartment'
import styles from './styles.module.scss'
import $api from '../../../http'
import { useStore } from '../../../hooks/useStore'

interface ApartmentCardProps {
   apartment: Apartment
}

export const ApartmentCard: FC<ApartmentCardProps> = ({ apartment }) => {
   const { store } = useStore()

   const handleDelete = async () => {
      try {
         await $api.delete(`/apartments/${apartment._id}`)
         store.fetchApartments()
      } catch (e) {
         console.error(e)
      }
   }

   return (
      <div className={styles.card_container}>
         <ul className={styles.apartment_info_list}>
            <li className={styles.apartment_item}>{apartment.name}</li>
            <li className={styles.apartment_item}>{`${apartment.rooms} room${apartment.rooms > 1 ? 's' : ''}`}</li>
            <li className={styles.apartment_item}>${apartment.price}</li>
            <li className={styles.apartment_item}>{apartment.description}</li>
         </ul>
         <button onClick={handleDelete} className={styles.btn}>
            Delete
         </button>
      </div>
   )
}
