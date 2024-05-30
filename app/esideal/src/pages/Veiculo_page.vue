<template>
    <div class="page-container">
        <div class="header">
            <div class="title-container">
                <Title title="E.S. Ideal" subtitle="Dados do Veículo"/>
            </div>
        </div>
        <div class="content">
            <div class="box">
                <div class="cabecalho_caixa titulo">
                    Veículo
                </div>
                <div v-if="dono" class="conteudo_caixa texto">
                    <Info :veiculo = veiculo
                        :dono="dono">
                    </Info>
                </div>
            </div>
            <div class="box hist">
                <div class="cabecalho_caixa titulo">
                    Histórico
                </div>
                <div class="conteudo_caixa hist">
                    <table class="hist-table texto_hist">
                        <thead>
                            <th>Id</th>
                            <th>Descrição</th>
                            <th>Data</th>
                        </thead>
                        <tbody>
                            <tr class="texto_hist choosen" @click="$router.push('/services/'+item.id)" v-for="(item, index) in historico" :key="index">
                                <td> {{ item.id }} </td>
                                <td> {{ item.descricao }} </td>
                                <td v-if="item.data">{{ item.data.dia }}/{{ item.data.mes }}/{{ item.data.ano }} {{ item.data.hora }}:{{ item.data.minutos }}</td>
                                <td v-else>-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="footer">
            <Button @click="$router.push('/services/')">Voltar</Button>
        </div>
    </div>
</template>

<script>
    import Title from "../components/Title.vue";
    import Button from "../components/ui/Button.vue";
    import { Servico } from "../models/servico.js";
    import { Veiculo } from "../models/veiculo.js";
    import Info from "../components/Veiculo_Info.vue";
    import Historico from "../components/Historico_veiculo.vue";
    import { useFuncionarioStore } from "../store/funcionarioStore";

    export default {
        props: ['id'],
        components: {
            Title,
            Button,
            Info,
            Historico
        },
        data() {
            return {
                veiculo: null,
                historico: [],
                dono:null,
                tipos: null // tipos de serviços
            };
        },
        methods: {
            loadHistory() {
                return fetch('http://localhost:3000/services?vehicleId=' + this.id)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Problema ao obter os dados do serviço');
                        }
                    })
                    .then(data => {
                        this.historico = data
                    })


            },
            getVeiculo(){
                return fetch('http://localhost:3000/vehicles/' + this.id)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Problema ao obter os dados do veículo');
                        }
                    })
                    .then(data => {
                        this.veiculo = new Veiculo();
                        this.veiculo.matricula = data.id;
                        this.veiculo.clientId = data.clientId;
                        this.veiculo.vehicleTypeId = data.vehicleTypeId;
                        this.veiculo.kms = data.kms;
                        this.veiculo.marca = data.marca;
                        this.veiculo.modelo = data.modelo;
                        
                        // sintaxe duvidosa -> testar se campos existem antes de os adicionar
                        if (data.cilindrada) {
                            this.veiculo.cilindrada = data.cilindrada;
                        }
                        if (data.potencia) {
                            this.veiculo.potencia = data.potencia;
                        }
                        
                    })

            },
            getDono(){
                return fetch('http://localhost:3000/clients/' + this.veiculo.clientId)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Problema ao obter os dados do cliente');
                        }
                    })
                    .then(data => {
                        this.dono = {nome: data.nome, contacto: data.telefone};
                    })
            },
            getTipos(){
                return fetch('http://localhost:3000/serviceDefinitions')
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Problema ao obter os dados dos tipos de serviço');
                        }
                    })
                    .then(data => {
                        let tipos ={}
                        for (let tipo of data){
                            tipos[tipo.id] = {descricao:tipo.descr, duracao:tipo.duracao};
                        }
                        this.tipos = tipos;
                    })
            },
            loadesData(){
                return veiculo !== null && dono !== null;
            }
        },

        async created(){
            //  sintaxe duvidosa
            const store = useFuncionarioStore();
            if (!store.funcionarioLogado){
                this.$router.push('/login');
            }
            else{

            await this.getVeiculo().then(this.loadHistory).then(this.getDono).then(this.getTipos).catch(error => {
                console.log(error);
            });
            }
        }
    }
  </script>


<style scoped>
    .box {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        height: 77%;
        width: 21%;
        background-color: rgba(96, 96, 96, 0.75);
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        border-radius: 20px;
        
        margin: 3%;
    }

    .box.hist {
        width: 35%;
    }

    .choosen:hover {
        background-color: rgba(55, 55, 55,);
    }

    .cabecalho_caixa { 
      flex: 17%;
      align-items: center;
      justify-content: center;
      display:flex;
    }
      
    .conteudo_caixa {
      flex: 75%;
      width: 70%;
      justify-content: center;
    }
    
    .conteudo_caixa.hist {
      overflow: auto;
      width: 80%
    }


    .titulo {
        font-size: 1.8rem;
        font-weight: 500;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        color: rgb(239, 239, 239);
    }

    @media screen and ((max-height: 600px) or (max-width: 750px)){
        .texto {
        font-size: 0.8rem;
        font-weight: 400;
        overflow-y: auto;
        }
        .titulo {
            font-size: 1.4rem;
            font-weight: 400;
        }
    }

    .texto_hist {
        font-size: 0.6rem;
    }

    .hist-table {
    width: 100%;
    border-collapse: collapse;
    }

    .hist-table th,
    .hist-table td {
    border: 1px solid #202020ae;
    padding: 8px;
    text-align: center;
    }

    .hist-table thead {
    background-color: rgba(96, 96, 96, 0.5);
    color: rgb(238, 238, 238);
    }

    .hist-table tbody {
    color: rgb(238, 238, 238);
    }
</style>
