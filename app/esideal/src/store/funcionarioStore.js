import { defineStore } from "pinia";

export const useFuncionarioStore = defineStore('funcionario', {
  state: () => ({
    id : null,
    nome: null,
    password: null,
    especialidade: null
  }),
  actions: {
    login(id, password,especialidade,nome) {
      this.id = id;
      this.password = password;
      this.especialidade = especialidade;
      this.nome = nome;
    },
    logout() {
      this.id = null;
      this.password = null;
      this.especialidade = null;
      this.nome = null;
    }
  },
  getters: {
    funcionarioLogado(state) {
        return state.id !== null || state.password !== null || state.especialidade !== null;
    }
  }
});