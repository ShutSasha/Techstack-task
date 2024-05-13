import $api from '../../http/index'
import { makeAutoObservable, runInAction } from 'mobx'
import { Apartment } from '../../models/apartment'

export default class Store {
   apartments = [] as Apartment[]
   isLoading = true

   constructor() {
      makeAutoObservable(this)
      this.fetchApartments()
   }

   async fetchApartments() {
      try {
         const { data } = await $api('/apartments')
         runInAction(() => {
            this.apartments = data
            this.isLoading = false
         })
      } catch (error) {
         console.error(error)
         runInAction(() => {
            this.isLoading = false
         })
      }
   }

   setApartments(apartments: Apartment[]) {
      this.apartments = apartments
   }
}
