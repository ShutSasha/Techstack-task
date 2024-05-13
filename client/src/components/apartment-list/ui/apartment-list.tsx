import { FC, useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { ApartmentCard } from '../../apartment-card/ui/apartment-card'
import { useStore } from '../../../hooks/useStore'
import { observer } from 'mobx-react-lite'
import { Select } from 'antd'
import { fetchSortedData } from '../helpers/fetch-sorted-data'

interface ApartmentListProps {
   style?: React.CSSProperties
}

export const ApartmentList: FC<ApartmentListProps> = observer(({ style }) => {
   const { store } = useStore()
   const [sort, setSort] = useState('none')
   const [filter, setFilter] = useState('all')
   const [roomOptions, setRoomOptions] = useState<{ value: number; label: string }[]>([])

   const handleSortChange = (value: string) => {
      setSort(value)
      fetchSortedData(value, filter, setRoomOptions, setSort, setFilter, store)
   }

   const handleFilterChange = (value: string) => {
      setFilter(value)
      fetchSortedData(sort, value, setRoomOptions, setSort, setFilter, store)
   }

   useEffect(() => {
      fetchSortedData(sort, filter, setRoomOptions, setSort, setFilter, store)
   }, [store.apartments.length])

   if (!store.apartments.length) {
      return <div>Loading apartments or no apartments now...</div>
   }

   return (
      <div style={{ ...style }}>
         <div className={styles.apartment_header}>
            <h2 className={styles.available_apartment_title}>
               🏡 Available Apartments {`(${store.apartments.length})`}
            </h2>
            <div className={styles.apartment_controls}>
               <div className={styles.filter}>
                  Filter by:
                  <Select
                     defaultValue='all'
                     style={{ width: 140, marginLeft: '10px' }}
                     value={filter}
                     onChange={handleFilterChange}
                     options={[{ value: 'all', label: 'All' }, ...roomOptions]}
                  />
               </div>
               <div className={styles.sort}>
                  Sort by:
                  <Select
                     defaultValue='none'
                     style={{ width: 140, marginLeft: '10px' }}
                     value={sort}
                     onChange={handleSortChange}
                     options={[
                        { value: 'none', label: 'None' },
                        { value: 'asc', label: 'Price - lowest to highest' },
                        { value: 'desc', label: 'Price - highest to lowest' },
                     ]}
                  />
               </div>
            </div>
         </div>
         <div className={styles.apartment_list}>
            {store.apartments.map((apartment) => (
               <ApartmentCard key={apartment._id} apartment={apartment} />
            ))}
         </div>
      </div>
   )
})
