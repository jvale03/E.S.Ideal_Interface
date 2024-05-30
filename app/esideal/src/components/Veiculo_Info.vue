<template>
  <div class="texto">
    <div>
        Matrícula:  {{ veiculo.matricula }}
    </div>
    <div>
        Marca:  {{ veiculo.marca }}
    </div>
    <div>
        Modelo:  {{ veiculo.modelo }}
    </div>    
    <div>
        Tipo:  {{ veiculo.vehicleTypeId }}
    </div>


    <div>
        Kms:  {{ veiculo.kms }}
    </div>
    <div>
        Dono:  {{ dono.nome }}
    </div>
    <div>
        Contacto:  {{ dono.contacto }}
    </div>

  </div>

</template>



<script>
  import { Veiculo } from '../models/veiculo';

  export default {
  // fazer de forma diferente 
    props: {
      veiculo: {
        type: Veiculo,
        required: true
      },
      dono: {
        nome:{
          type: String,
          required: true
        },
        contacto:{
          type: String,
          required: true
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
      margin: 5px;
  }

  .texto > div {
    margin: 7px
  }
  
  
 


</style>