import { acceptHMRUpdate, defineStore } from 'pinia'
import Merchant from '~~/models/Merchants'

export const useIndex = defineStore('index', {
  state: () => ({
    token: null as String|null,
    merchants: [] as Array<Merchant>

  }),

  getters: {
    isLogged: state => state.token ? true : false,
    getToken: state => state.token || localStorage.getItem('token'),
    getMerchants : state => state.merchants
  },
  actions: {
    setToken(token: string|null){
      this.token = token
    },
    signOut(){
      this.token = null
    },
    setMerchants(merchants: Array<Merchant>){
      console.log(merchants);
      
      this.merchants = merchants
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useIndex, import.meta.hot))
}
