<script>
import { usePostoStore } from "@/store/postoStore";
import Button from "./ui/Button.vue";


export default {
  
  props: ['items','tipos'],
  emits: ['filtroMecanico','filtroPosto','filtroEstado'],
  components: {
    Button
  },
  data() {
    return {
      itemsPerPage: 8,
      currentPage: 1,
      ordenacaoDuracao: '', 
      ordenacaoData: '',
      ordenacaoId: 'asc',
      posto: true,
      collumn: true,
      currentState: ''
    };
  },
  computed: {
      displayedItems() {
          const startIndex = (this.currentPage - 1) * this.itemsPerPage;
          const endIndex = startIndex + this.itemsPerPage;
          return this.items.slice(startIndex, endIndex);
      },
          totalPages() {
          return Math.ceil(this.items.length / this.itemsPerPage);
      }
  },
  methods: {

      filtroEstado(estado) {
        if (this.currentState === estado) {
          this.currentState = '';
          this.$emit('filtroEstado',this.currentState);
          return;
        }
        else {
          this.currentState = estado;
          this.$emit('filtroEstado',this.currentState);
          return 
        }
      },
  
      goToPage(pageNumber) {
      this.currentPage = pageNumber;
      },
      updateItemsPerPage() {
      const itemHeight = 110;
      const windowHeight = window.innerHeight;
      this.itemsPerPage = Math.floor(windowHeight / itemHeight);
      if (window.innerWidth > 800) this.collumn = true;
      if (window.innerWidth < 800) this.collumn = false;
      },
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
      filtroPosto() {
        this.posto = !this.posto;
        this.$emit('filtroPosto',this.posto);
      },
      ordenar_duracao() {
        if (this.ordenacaoDuracao === 'asc') {
            this.ordenacaoDuracao = 'desc';
            this.items.sort((a, b) => this.tipos[a.serviceDefinitionId].duracao - this.tipos[b.serviceDefinitionId].duracao);
        } else {
            this.ordenacaoDuracao = 'asc';
            this.items.sort((a, b) => this.tipos[b.serviceDefinitionId].duracao - this.tipos[a.serviceDefinitionId].duracao);
        }
        this.ordenacaoData = "";
        this.ordenacaoId = "";
    },
    ordenar_data() {
    if (this.ordenacaoData === 'asc') {
        this.ordenacaoData = 'desc';
        this.items.sort((a, b) => this.comparaDatas(b, a));
    } else {
        this.ordenacaoData = 'asc';
        this.items.sort((a, b) => this.comparaDatas(a, b));
    }
    this.ordenacaoDuracao = "";
    this.ordenacaoId = "";
  },
  comparaDatas(a, b) {
    // Recebe dois objetos com propriedades "dia", "mes", "ano", "hora" e "minutos" e devolve a diferença entre eles em minutos
    if (!a.data) return 1;
    if (!b.data) return -1;
    
    let res = a.data.ano - b.data.ano;
    if (res == 0) {
        res = a.data.mes - b.data.mes;
        if (res == 0) {
            res = a.data.dia - b.data.dia;
            if (res == 0) {
                res = a.data.hora - b.data.hora;
                if (res == 0) {
                    res = a.data.minutos - b.data.minutos;
                }
            }
        }
    }

    return res;
  
  },
      ordenar_id() {
          if (this.ordenacaoId === 'asc') {
              this.ordenacaoId = 'desc';
              this.items.sort((a, b) => Number(a.id.substring(1)) - Number(b.id.substring(1)));
          } else {
              this.ordenacaoId = 'asc';
              this.items.sort((a, b) => Number(b.id.substring(1)) - Number(a.id.substring(1)));
          }
          this.ordenacaoDuracao = "";
          this.ordenacaoData = "";
      },
    },
      created() {
          this.updateItemsPerPage(); // Para definir inicialmente o número correto de itens por página
      },
      mounted() {
          window.addEventListener("resize", this.updateItemsPerPage); // Adicionar um listener de evento para redimensionar a janela
      },
      beforeDestroy() {
          window.removeEventListener("resize", this.updateItemsPerPage); // Remover o listener de evento ao destruir o componente
      },
}


</script>

   <template>
    <div class="table-container">

      <div class="filter-buttons">
        <button class="nav-button" :class="{ active: currentState === 'nafila' }" @click="filtroEstado('nafila')">Na Fila</button>
        <button class="nav-button" :class="{ active: currentState === 'suspenso' }" @click="filtroEstado('suspenso')">Suspenso</button>
        <button class="nav-button" :class="{ active: currentState === 'iniciado' }" @click="filtroEstado('iniciado')">Iniciado</button>
      </div>

      <table v-if="collumn" class="custom-table">
        <thead>
          <tr>
            <th class="choosen" @click="ordenar_id">Id
              <i v-if="ordenacaoId === 'asc'" class="fas fa-arrow-up"><img src="../../imgs/up.png" width=15px height=12px ></i>
              <i v-else-if="ordenacaoId === 'desc'" class="fas fa-arrow-down"><img src="../../imgs/down.png" width=15px height=12px ></i>
            </th>
            <th>Descrição</th>
            <th class="choosen" @click="ordenar_data">Data Limite
              <i v-if="ordenacaoData === 'asc'" class="fas fa-arrow-up"><img src="../../imgs/up.png" width=15px height=12px ></i>
              <i v-else-if="ordenacaoData === 'desc'" class="fas fa-arrow-down"><img src="../../imgs/down.png" width=15px height=12px ></i>
            </th>
            <th>Estado</th>
            <th class="choosen" @click="ordenar_duracao">Duração
              <i v-if="ordenacaoDuracao === 'asc'" class="fas fa-arrow-up"><img src="../../imgs/up.png" width=15px height=12px ></i>
              <i v-else-if="ordenacaoDuracao === 'desc'" class="fas fa-arrow-down"><img src="../../imgs/down.png" width=15px height=12px ></i>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="choosen" @click="$router.push('/services/'+item.id)" v-for="(item, index) in displayedItems" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.descricao }}</td>
            <td v-if="item.data">{{ item.data.dia }}/{{ item.data.mes }}/{{ item.data.ano }} {{ item.data.hora }}:{{ item.data.minutos }}</td>
            <td v-else>-</td>
            <td>{{ item.estado }}</td>
            <td>{{ formatarMinutos(tipos[item.serviceDefinitionId].duracao)}}</td>
          </tr>
        </tbody>
      </table>

      <table v-else class="custom-table">
        <thead>
          <tr>
            <th class="choosen" @click="ordenar_id">Id
              <i v-if="ordenacaoId === 'asc'" class="fas fa-arrow-up"><img src="../../imgs/up.png" width=15px height=12px ></i>
              <i v-else-if="ordenacaoId === 'desc'" class="fas fa-arrow-down"><img src="../../imgs/down.png" width=15px height=12px ></i>
            </th>
            <th class="choosen" @click="ordenar_data">Data Limite
              <i v-if="ordenacaoData === 'asc'" class="fas fa-arrow-up"><img src="../../imgs/up.png" width=15px height=12px ></i>
              <i v-else-if="ordenacaoData === 'desc'" class="fas fa-arrow-down"><img src="../../imgs/down.png" width=15px height=12px ></i>
            </th>
            <th>Estado</th>
            <th class="choosen" @click="ordenar_duracao">Duração
              <i v-if="ordenacaoDuracao === 'asc'" class="fas fa-arrow-up"><img src="../../imgs/up.png" width=15px height=12px ></i>
              <i v-else-if="ordenacaoDuracao === 'desc'" class="fas fa-arrow-down"><img src="../../imgs/down.png" width=15px height=12px ></i>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="choosen" @click="$router.push('/services/'+item.id)" v-for="(item, index) in displayedItems" :key="index">
            <td>{{ item.id }}</td>
            <td v-if="item.data">{{ item.data.dia }}/{{ item.data.mes }}/{{ item.data.ano }} {{ item.data.hora }}:{{ item.data.minutos }}</td>
            <td v-else>-</td>
            <td>{{ item.estado }}</td>
            <td>{{ formatarMinutos(tipos[item.serviceDefinitionId].duracao)}}</td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <div class="left-block">
            <Button @click="$router.push('/postos/')">Voltar</Button>
        </div>
        <div class="center-block">
            <span v-for="pageNumber in totalPages" :key="pageNumber">    
                <button class="nav-button" @click="goToPage(pageNumber)" :class="{ active: pageNumber === currentPage }">{{ pageNumber }}</button>
            </span>
        </div>
        <div class="right-block">
          <Button v-if="this.posto" class="item" @click="filtroPosto" >Serviços de Mecânico</Button>
          <Button v-else class="item" @click="filtroPosto">Serviços de Posto</Button>
        </div>
      </div>
    </div>
  </template>

<style>
.filter-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.item {
  margin:5px;
  font-size: 0.6rem;
  width: 50px;
  height: 40px;
}

.table-container {
  width: 80%;
  max-height: 85%; /* Defina a altura máxima desejada */
  overflow-x: auto;
  overflow-y: auto; /* Adicione overflow-y: auto; para habilitar a barra de rolagem vertical */
  }
   

.custom-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
}

.custom-table th,
.custom-table td {
  border: 1px solid #202020ae;
  padding: 8px;
  text-align: center;
}

.custom-table thead {
  background-color: rgba(96, 96, 96, 1);
  opacity: 0.85;
  color: rgb(238, 238, 238);


}

.custom-table tbody {
  background-color: rgba(96, 96, 96, 1);
  opacity: 0.7;
  color: rgb(238, 238, 238);
}



.choosen:hover {
    background-color: rgb(55, 55, 55);
    opacity: 0.9; 
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  font-size: 1rem;
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

.nav-button {
    padding: 7px 15px;
    border: 1px solid #dddddd;
    background-color: #f2f2f2;
    border-radius: 7px;
    font-weight: 600;
    color: #333333;
    cursor: pointer;
}

.nav-button:hover {
    background-color: #000000;
    color: rgb(238, 238, 238);
}

.nav-button.active {
    background-color: rgba(96, 96, 96, 1);
    color: rgb(238, 238, 238);
}



@media screen and (max-width: 650px) {
    .table-container {
        font-size: 0.75rem;
    }
}

@media screen and (max-height: 600px) {
  .nav-button {
    padding: 5px 10px;
  }
}

@media screen and (max-height: 500px) {
  .nav-button {
    padding: 3px 6px;
  }

  .filter-buttons {
    display: none;
  }
}
</style>
