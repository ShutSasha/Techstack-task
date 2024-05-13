import { FC, useState } from 'react'
import { Input } from 'antd'
import styles from './styles.module.scss'
import { createApartmentRent } from '../api/create-apartment-rent'
import { useStore } from '../../../hooks/useStore'
import { showNotice } from '../../../app/helpers/functions'

interface ApartmentFormProps {
   style?: React.CSSProperties
}

export const ApartmentForm: FC<ApartmentFormProps> = ({ style }) => {
   const { store } = useStore()
   const [name, setName] = useState('')
   const [rooms, setRooms] = useState('')
   const [price, setPrice] = useState('')
   const [description, setDescription] = useState('')

   const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault()
      const isSuccess = await createApartmentRent({ name, rooms: Number(rooms), price: Number(price), description })
      if (isSuccess) {
         setName('')
         setRooms('')
         setPrice('')
         setDescription('')
         store.fetchApartments()
         showNotice('Rent created successfully', 'Success', 'success')
      }
   }

   return (
      <div style={{ ...style }}>
         <h2 className={styles.title}>🤑 Create a new rent</h2>
         <form className={styles.form_container}>
            <Input placeholder='Ex. Flat in the city center' value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder='Rooms' value={rooms} onChange={(e) => setRooms(e.target.value)} />
            <Input placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} />
            <Input placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
            <button onClick={(e) => handleSubmit(e)} className={styles.btn}>
               Create
            </button>
         </form>
      </div>
   )
}
