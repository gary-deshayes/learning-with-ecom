import { acceptHMRUpdate, defineStore } from 'pinia'

const delay = (t: number) => new Promise((r) => setTimeout(r, t))

export const useIndex = defineStore('index', {
  state: () => ({
    token: null as String|null
  }),

  getters: {
    isLogged: state => state.token ? true : false
  },
  actions: {
    setToken(token: string|null){
      this.token = token
    },
    signOut(){
      this.token = null
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useIndex, import.meta.hot))
}
