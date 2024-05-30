<script>

  import Table from "../components/Table.vue";
  import Title from "../components/Title.vue";
  import CustomInput from "../components/ui/InputBox.vue";
  import Button from "../components/ui/Button.vue";
  import { usePostoStore } from "../store/postoStore.js";
  import { useFuncionarioStore } from "../store/funcionarioStore.js";
  
  export default {
    components: {
      Table,
      Title,
      Button,
      CustomInput
    },
    data() {
      return {
        servicos: null,
        tipos: null
      };
    },

    methods: {
      getServicos(semRealizados = true) {
        return fetch('http://localhost:3000/services')
        .then(response =>{
          if (response.ok) return response.json()
          else throw new Error('Problema ao obter os dados dos serviços atribuídos')
        }).then(data => {
          if (semRealizados)
          {
            data = data.filter(servico=> servico.estado !== 'realizado');
          }
          this.servicos = data;
        })
        
      },
      getTipos() {
        return fetch('http://localhost:3000/serviceDefinitions')
        .then(response =>{
          if (response.ok) return response.json()
          else throw new Error('Problema ao obter os dados dos tipos de serviço')
        }).then(data => {
          let tipos = {};
          for (let i = 0; i < data.length; i++) {
            tipos[data[i].id] = {descricao: data[i].descr, duracao: data[i].duracao};
          }
          this.tipos = tipos;
          console.log(this.tipos);
        })
      },
      filtroMecanico(apenasDoMecanico) {
        const store = useFuncionarioStore();
        if (store.especialidade ==='geral')
        {
          console.log("Este mecânico consegue fazer todo o tipo de serviços");
          return
        }
        if (apenasDoMecanico)
        {
            if (store.especialidade ==='combustao')
            {
            let possiveis = []
            fetch('http://localhost:3000/vehicle-types/gasolina').
            then(response => {
              if (response.ok) return response.json()
              else throw new Error('Problema ao obter os dados dos veículos a combustão')
            }).then(data => {
              possiveis = data.servicos;
              fetch('http://localhost:3000/vehicle-types/gasoleo').
              then(response => {
                if (response.ok) return response.json()
                else throw new Error('Problema ao obter os dados dos veículos a combustão')
              }).then(data => {
                let x = data.servicos.filter(servico => possiveis.includes(servico.vehicleTypeId));
                possiveis = possiveis.concat(x);
                this.servicos = this.servicos.filter(servico => possiveis.includes(servico.serviceDefinitionId));
              }).catch
              (error => {
                console.log(error);
              });
            }).catch(error => {
              console.log(error);
            });
            }
            else
            {
              fetch('http://localhost:3000/vehicle-types/'+store.especialidade).
              then(response => {
                if (response.ok) return response.json()
                else throw new Error('Problema ao obter os dados dos veículos a combustão')
              }).then(data => {
                let possiveis = data.servicos;
                this.servicos = this.servicos.filter(servico => possiveis.includes(servico.serviceDefinitionId));
              })

            }
        }
        else
        {
          this.getServicos().
          catch(error => {
            console.log(error);
          });
        }
      },
      filtroEstado(estado) {        

        this.getServicos()
        .then(() => {
            if (estado !== '') {
                this.servicos = this.servicos.filter(servico => servico.estado === estado);
            }
        })
        .catch(error => {
            console.error(error);
        });
      },

      filtroPosto(apenasDoPosto){
        const store = usePostoStore();
        if (apenasDoPosto)
        {
          fetch('http://localhost:3000/vehicle-types/'+store.tipo).
          then(response => {
            if (response.ok) return response.json()
            else throw new Error('Problema ao obter os dados dos tipos que o posto aceita')
          }).then(data => {
            let possiveis = data.servicos;
            this.servicos = this.servicos.filter(servico => possiveis.includes(servico.serviceDefinitionId));
          })
        }
        else
        {
          this.getServicos().
          catch(error => {
            console.log(error);
          });
        }
      },

    },
    

    created() {

      const store = useFuncionarioStore();
      if (!store.funcionarioLogado ){
          alert("Login necessário para aceder a esta página");
          this.$router.push('/login');
  
      }
      else{
        const postoStore = usePostoStore();
        if (!postoStore.postoDefinido){
          alert("Posto não foi escolhido");
          this.$router.push('/postos');
        }
        else{
        this.getServicos().
        then(this.filtroPosto(true)).
        then(this.getTipos).
        catch(error => {
          console.log(error);
        });
        }
      }
    }
  }
  </script>

<template>
  <div class="page-container">
    <div class="header">
      <div class="title-container">
        <Title title="E.S. Ideal" subtitle="Serviços Atribuídos" />
      </div>
    </div>
    <div v-if="tipos" class="content">
      <Table   :items="servicos" :tipos="tipos" @filtroPosto="filtroPosto" @filtroEstado="filtroEstado"/>
    </div>
    <div class="footer">
    </div>
  </div>
</template>
  
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
</style>
