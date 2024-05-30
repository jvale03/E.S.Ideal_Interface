import { defineStore } from "pinia";

export const usePostoStore = defineStore('posto', {
  state: () => ({
    tipo: null,
  }),
  actions: {
    setPosto(tipo) {
      this.tipo = tipo;
    }
  },
  getters: {
    postoDefinido(state) {
        return state.tipo !== null;
    }
  }


});