
<template>
  <div class="page-container">
    <div class="header">
      <div class="title-container">
        <Title title="E.S. Ideal" subtitle="Log In" />
      </div>
    </div>
    <div class="content">
      <form @submit.prevent="login">
        <div class="input-container">
          <input name="id" type="text" v-model.trim="id" placeholder="Enter your ID" required/>
        </div>
        <div class="input-container">
          <input name="password" type="password" v-model.trim="password" placeholder="password" required/>
        </div>
        <div class="button-container">
          <Button type="submit">Seguinte</Button>
        </div>
      </form>
    </div>
    <div class="footer">
    </div>
  </div>
</template>


<script>
import Title from "../components/Title.vue";
import Button from "../components/ui/Button.vue"
import {useFuncionarioStore} from "../store/funcionarioStore.js";


export default {
  components: {
    Title,
    Button,
  },
  data() {
    return {
      id: '',
      password: ''
    };    
  },
  methods: {
    login() {
      console.log('Log in : ' + this.id + ' / ' + this.password);
      if (this.id === '' || this.password === '') {
        alert('Por favor preencha todos os campos');
        return;
      }
      fetch('http://localhost:3000/funcionarios/' + this.id)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Problema ao obter os dados do utilizador');
          }
        })
        .then(data => {
          if (data.passe === this.password) {
            const funcStore = useFuncionarioStore();
            funcStore.login(data.id,data.pass,data.especializacao,data.nome);
            console.log('Log in efetuado com sucesso '+ funcStore.nome + ' / ' + funcStore.especialidade);
            this.$router.push('/postos');
          } else {
            alert('Dados de login incorretos');
          }
        })
        .catch(error => console.log(error));

    }
  },
  created() {
    const funcStore = useFuncionarioStore();
    funcStore.$reset();
  }
}
</script>

<style scoped>
.input-container { 
  display:flex;
  margin-bottom: 10px; /* Define o espaço entre as caixas de texto */
  align-items: center;
  justify-content: center;
}
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  flex-direction: column;

}


input {
  padding: 0.7rem 1.5rem;
  text-align: left;
  border: none;
  border-radius: 18px;
  font-weight: 450;
  background-color: #c3c3c3; /* Cinzento mais escuro */
  color: #000000; /* Texto branco para contrastar */
  transition: all 0.3s ease-in;
  font-style: italic;
  opacity: 0.85;
  font-size: 1rem;
  width: 300px;
  max-width: 400px;
  box-shadow: 2px 2px 4px rgba(69, 69, 69, 0.7);
}

input::placeholder {
    font-size: 1rem;
    color: #3e3e3e;
    font-weight: 300;
}

input:focus {
  outline: none;
  border-color: var(--color-accent-dark); /* Um tom mais escuro para o foco */
}

input:disabled {
  background-color: var(--color-gray);
  color: var(--color-dark-gray);
  cursor: not-allowed;
}

@media screen and (max-width: 800px) {
  input {
    width: 200px
  }
}

@media screen and (max-height: 600px) {
  input {
    height: 30px;
  }
}

@media screen and (max-height: 350px) {
  input {
    height: 20px;
  }
}

@media screen and (max-width: 650px) {
  input {
    width: 150px
  }
}
</style>
