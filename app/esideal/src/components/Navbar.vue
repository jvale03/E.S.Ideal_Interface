
<script>
import "../assets/style.css"
import Clock from "./Clock.vue"
import { useFuncionarioStore } from "../store/funcionarioStore.js";

export default {
  components: {
    Clock
  },
  data() {
    return {
    funcionario: "",

    }
  },
  methods: {
    loggedin() {
      const funcStore = useFuncionarioStore();
      if (funcStore.funcionarioLogado) {
        this.funcionario = funcStore.nome;
        return true;
      }
      else return false;
    },
    logout() {
      console.log("logout");
      this.$router.push("/login");
    }
  },
  computed: {
    mensagemEsquerda() {
      const funcStore = useFuncionarioStore();
      if (funcStore.funcionarioLogado) {
        return "Bem vindo," + funcStore.nome+"!";
      }
      else return "";
    }
  },
  created() {
    const funcStore = useFuncionarioStore();
    this.funcionario = funcStore.nome;
  }
}
</script>


<template>
  <header>
  <nav id="nav">
    <div class="left-block">
      <p class="text" v-if="loggedin()">{{this.funcionario}}</p>
      <p class="text" v-else>Utilizador</p>
    </div>
    <div class="center-block">
      <Clock />
    </div>
    <div class="right-block">
      <p v-if="loggedin()" @click="$router.push('/login')" class="text">Logout</p> <!-- Mova o evento de clique para aqui -->
    </div>
  </nav>
  </header>
</template>




<style scoped>
#nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #606060;
  opacity: 0.8;
}

.left-block,
.right-block,
.center-block {
  flex: 1;
}

.center-block {
  text-align: center;
}

.right-block {
  text-align: right;
}


.text {
  font-size: 1.1rem;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  color: white
}

@media screen and (max-height: 450px) {
  #nav {
    display: none;
  }
}

</style>
