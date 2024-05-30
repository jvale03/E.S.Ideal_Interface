<template>
  <div class="texto">
    <div>Descrição: {{ servico.descricao }}</div>
    <div>Tipo : {{ tipo.descricao }}</div>
    <div>Duração : {{ formatarMinutos(tipo.duracao) }}</div>
    <div v-if="servico.motivo">Motivo: {{servico.motivo}}</div>
    <div v-if="servico.recomendacao">Recomendação: {{servico.recomendacao}}</div>
  </div>

</template>



<script>
  import { Servico } from '../models/servico';

//  Esta página faz mais sentido ter dados referentes ao serviço, acrescentando aqui campos como estado, tipo , duração...
  export default {
    props: {
      servico:{
        type: Servico,
        required: true
      },
      tipo:{
        descricao:{
          type: String,
          required: true
        },
        duracao:{
          type: Number,
          required: true
        }
      },
    },
    methods: {
      formatarMinutos(minutos) {
          // recebe um número de minutos e devolve uma string no formato "HH:MM" (horas e minutos) ou "MM" (minutos) ou HH (horas)
          const horas = Math.floor(minutos / 60);
          const minutosRestantes = minutos % 60;
          if (horas > 0) {
              let s = `${horas}h`;
              if (minutosRestantes > 0) {
                  s += minutosRestantes.toString().padStart(2, "0");
              }
              return s;
          } else {
              return `${minutosRestantes}m`;
          }
      },
    }
  };
</script>

<style scoped>
  .texto {
    font-size: 1.1rem;
    font-weight: 450;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    color: rgb(239, 239, 239);
    overflow-wrap: break-word;
  }

  .texto > div {
    margin: 7px
  }

  @media screen and ((max-height: 650px) or (max-width: 800px)){
    .texto {
    font-weight: 400;
    overflow-y: auto;
    } 
  }
</style>