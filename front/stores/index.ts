import { acceptHMRUpdate, defineStore } from 'pinia'

const delay = (t: number) => new Promise((r) => setTimeout(r, t))

export const useIndex = defineStore('index', {
  state: () => ({}),

  getters: {
    isLogged: state => localStorage.getItem('token') ? true : false
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useIndex, import.meta.hot))
}
