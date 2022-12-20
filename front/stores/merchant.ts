import { acceptHMRUpdate, defineStore } from 'pinia'
import Merchant from '~~/models/Merchants'

export default defineStore('merchants', {
  state: () => ({
    merchants: [] as Array<Merchant>
  }),

  getters: {
    getMerchants : state => state.merchants
  },
  actions: {
    setMerchants(merchants: Array<Merchant>){
      this.merchants = merchants
    }
  }
})
