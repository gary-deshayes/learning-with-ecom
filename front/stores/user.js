
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user-store',
  state: () => {
    return {
    }
  },
  actions: {},
  getters: {
    isLogged: state => localStorage.getItem(token) ? true : false
  },
})