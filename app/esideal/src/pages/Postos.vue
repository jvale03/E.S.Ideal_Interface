
<template>
    <div class="page-container">
      <div class="header">
        <div class="title-container">
          <Title title="E.S. Ideal" subtitle="Postos" />
        </div>
      </div>
      <div class="content">
        <div class="postos-style">
            <PostosButton @click="escolherPosto('gasoleo')">Posto Gasóleo</PostosButton>
            <PostosButton @click="escolherPosto('gasolina')">Posto Gasolina</PostosButton>
        </div>
        <div class="postos-style">
            <PostosButton @click="escolherPosto('eletrico')">Posto Elétrico</PostosButton>
            <PostosButton @click="escolherPosto('hibrido')">Posto Híbrido</PostosButton>
        </div>
        <div class="button-container">
          <Button @click="$router.push('/login/')">Sair</Button>
        </div>
      </div>
      <div class="footer">
      </div>
    </div>
  </template>
  
  
  <script>
  import { useFuncionarioStore } from "@/store/funcionarioStore";
import Title from "../components/Title.vue";
  import PostosButton from "../components/ui/PostosButton.vue";
  import { usePostoStore } from "../store/postoStore.js";
  
  
  export default {
    components: {
      Title,
      PostosButton
    },
    data() {
      return {
        postos: ["gasoleo", "gasolina", "eletrico", "hibrido"]
      };
    },
    methods:{
      escolherPosto(posto){
        if (!this.postos.includes(posto)){
          console.log("Posto inválido")
          return;
        }
        console.log("Posto escolhido: "+posto)
        const postoStore = usePostoStore();
        postoStore.setPosto(posto);
        this.$router.push('/services/');
      }
    
    },
    created() {
      const funcStore = useFuncionarioStore();
      if (!funcStore.funcionarioLogado){
        alert("Login necessário para aceder a esta página");
        this.$router.push('/login');
      }
      const postoStore = usePostoStore();
      postoStore.$reset();
    }
  }
  </script>
  
  <style scoped>
  .postos-style {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    flex-direction: column;

  }
  
  </style>
  