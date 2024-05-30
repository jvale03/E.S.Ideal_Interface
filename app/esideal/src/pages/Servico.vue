<template>
    <div class="page-container">
        <div class="header">
            <div class="title-container">
                <Title title="E.S. Ideal" subtitle="Serviço"/>
            </div>
        </div>
        
        <div v-if="dadosCarregados()"class="content">
            <!-- acrescentar algum tipo de verificação do estado -> v-if="estadoSuspenso()" -->
            <div v-if="!mostrarBox" @click="$router.push('/veiculo/'+servico.matricula)" class="selectable_box">
                <div class="cabecalho_caixa titulo">
                    Veículo
                </div>
                <div class="conteudo_caixa texto">
                    <Info :veiculo=veiculo :dono=dono ></Info>
                </div>
                <div class="footer_caixa estado">
                </div>
            </div>
            <div v-if="mostrarBox && estado==='suspenso'" class="box">
                <div class="cabecalho_caixa titulo">
                    Motivo
                </div>
                <div class="conteudo_caixa texto">
                    <textarea class="caixa-input" v-model.trim="input" placeholder="Insira o texto..."></textarea>
                </div>
                <Button class="botao-abaixo" @click="submeterMotivo">Submeter</Button>
            </div>
            <div v-if="mostrarBox && estado==='realizado'" class="box">
                <div class="cabecalho_caixa titulo">
                    Recomendação
                </div>
                <div class="conteudo_caixa texto">
                    <textarea class="caixa-input" v-model.trim="input" placeholder="Insira o texto..."></textarea>
                </div>
                <Button class="botao-abaixo" @click="submeterRecomendacao">Submeter</Button>
            </div>
            <div v-if="!mostrarBox" class="box">
                <div class="cabecalho_caixa titulo">
                    Descrição
                </div>
                <div class="conteudo_caixa texto">
                    <Descricao :servico=servico :tipo=tipo></Descricao>
                </div>
                <div class="footer_caixa estado">
                    {{estado}}
                </div>
            </div>
        </div>
        <div v-if="!mostrarBox" class="footer">
            <Button class="item" @click="$router.push('/services/')">Voltar</Button>
            <div v-if="estado==='iniciado'">
                <Button class="item" @click="suspender">Suspender</Button>
                <Button class="item"  @click="finalizar">Finalizar</Button>
            </div>
            <div v-else-if="estado!=='realizado'">
                <Button class="item" @click="iniciar">Iniciar</Button>
            </div>
            
      <!-- Botões Suspender e Finalizar -->
        </div>
    </div>
</template>



<script>
    import Title from "../components/Title.vue";
    import Button from "../components/ui/Button.vue";
    import { Servico } from "../models/servico.js";
    import { Veiculo } from "../models/veiculo.js";
    import Info from "../components/Veiculo_Info.vue";
    import Descricao from "../components/Descricao_veiculo.vue";
    import { useFuncionarioStore } from "../store/funcionarioStore";
    import { usePostoStore } from "../store/postoStore";
    import InputBox from "../components/ui/InputBox.vue";
    

    export default {
        props: ['id'],
        components: {
            Title,
            Button,
            Info,
            Descricao,
            InputBox
        },
        data() {
            return {
                veiculo: null,
                servico: null,
                dono:null,
                tipo:null,
                estado: 'nafila',
                mostrarBox: false,
                input: ''

            };
        },
       
        methods: {
            async loadData() {
                console.log('http://localhost:3000/services/' + this.id)
                fetch('http://localhost:3000/services/' + this.id)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Problema ao obter os dados do serviço');
                        }
                    })
                    .then(data => {
                        console.log(data)
                        let s = new Servico();
    
                        // ter muita em atenção a esta parte porque há casos em que não há datas
                        s.id = data.id;
                        s.matricula = data.vehicleId;
                        s.tipo = data.serviceDefinitionId;
                        s.estado = data.estado;
                
                        s.agendamento = data.agendamento;
                        s.descricao = data.descricao;
                        s.data = data.data;
                        s.motivo = data.motivo;
                        s.recomendacao = data.recomendacao;
                        
                        console.log("Servico no carro: "+s.matricula)
                        this.servico = s;
                        this.estado = s.estado;
                        console.log("Servico no carro: "+this.servico.matricula)
                        //this.servico.data = data.data
                    })
                    .then(() => {
                        this.getVeiculo().
                        then(() => {
                            this.getDono();
                        })})
                        .then(() => {
                            this.getTipo();
                        })
                    .catch(err => console.log(err));

            },
            getVeiculo(){
                return fetch('http://localhost:3000/vehicles/' + this.servico.matricula)
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
                        this.veiculo.cilindrada = data.cilindrada;
                        this.veiculo.kms = data.kms;
                        this.veiculo.marca = data.marca;
                        this.veiculo.modelo = data.modelo;
                        
                    })

            },
            getDono(){
                    fetch('http://localhost:3000/clients/' + this.veiculo.clientId)
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
            getTipo(){
                console.log('http://localhost:3000/serviceDefinitions/' + this.servico.tipo)
                fetch('http://localhost:3000/serviceDefinitions/' + this.servico.tipo)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Problema ao obter os dados do tipo de serviço');
                    }
                })
                .then(data => {
                    this.tipo = {descricao: data.descr, duracao: data.duracao};
                })
            },
            dadosCarregados(){
                return this.servico && this.veiculo && this.dono && this.tipo;
            },

            async possivelFazerAlgo(){
                const store = usePostoStore();

                if(!store.postoDefinido)
                {
                    alert("Posto não definido");
                    this.$router.push('/postos');
                    return false;
                }
                else
                {
                    return fetch('http://localhost:3000/vehicle-types/'+store.tipo).
                    then(response => {
                        if (response.ok) return response.json()
                        else throw new Error('Problema ao obter os dados dos tipos que o posto aceita')
                    }).then(data => {
                        if (!data.servicos.includes(this.servico.tipo))
                        {
                            console.log("Serviço indisponível no posto")
                            return false;
                        }
                        else
                        {
                            const func = useFuncionarioStore();
                            if (func.especialidade ==='geral')
                            {
                                console.log("Funcionário pode fazer qualquer serviço")
                                return true;
                            }
                            else if (func.especialidade ==='combustao')
                            {
                                let possiveis = []
                                return fetch('http://localhost:3000/vehicle-types/gasolina').
                                then(response => {
                                if (response.ok) return response.json()
                                else throw new Error('Problema ao obter os dados dos serviços que o funcionario consegue efetuar')
                                }).then(data => {
                                possiveis = data.servicos;
                                return fetch('http://localhost:3000/vehicle-types/gasoleo').
                                then(response => {
                                    if (response.ok) return response.json()
                                    else throw new Error('Problema ao obter os dados dos serviços que o funcionario consegue efetuar')
                                }).then(data => {
                                    possiveis = possiveis.concat(data.servicos);
                                    return possiveis.includes(this.servico.tipo);
                                }).catch
                                (error => {
                                    console.log(error);
                                    return false;
                                });
                                }).catch(error => {
                                console.log(error);
                                return false;

                                });
                            }
                            else
                            {
                                return fetch('http://localhost:3000/vehicle-types/'+func.especialidade).
                                then(response => {
                                    if (response.ok) return response.json()
                                    else throw new Error('Problema ao obter os dados dos serviços que o funcionario consegue efetuar')
                                }).then(data => {
                                    return data.servicos.includes(this.servico.tipo);
                                })
                            }
                        }
                    }).catch(err => {console.log(err);return false});

                }
            },
            async iniciar() {
                // Ativar a flag de serviço iniciado
                let possivel = await this.possivelFazerAlgo();
                if (!possivel){
                    console.log("Não é possível fazer o serviço");
                    return
                }
                this.servico.voltar();
                this.estado = "iniciado";
                
                
                fetch('http://localhost:3000/services/' + this.servico.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: this.servico.toJson()
                }).catch(err => console.log(err));

                // Coloque aqui o código necessário para iniciar o serviço
            },
            voltar() {
                // Desativar a flag de serviço iniciado
                this.estado = false;
                // Coloque aqui o código para voltar
            },
            suspender() {
                // Coloque aqui o código para suspender o serviço
                this.estado = "suspenso";       
                this.mostrarBox = true;
                this.input = '';

            },
            async finalizar() {
                // Coloque aqui o código para finalizar o serviço
                let possivel = await this.possivelFazerAlgo();
                if (!possivel){
                    console.log("Não é possível fazer o serviço");
                    return
                }
                this.estado = "realizado";
                this.servico.estado = "realizado";
                this.input = '';
                this.mostrarBox = true;

                fetch('http://localhost:3000/services/' + this.servico.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: this.servico.toJson()
                }).catch(err => console.log(err));
            },
            submeterMotivo() {
                this.mostrarBox = false;
                this.servico.suspender(this.input);
                this.estado = "suspenso";
                fetch('http://localhost:3000/services/' + this.servico.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: this.servico.toJson()
                }).catch(err => console.log(err));
                // isto aqui vai ser para as funções de alterar o estado do serviço
            },
            submeterRecomendacao() {
                this.mostrarBox = false;
                if (this.input !== '')
                {
                    console.log("Recomendação submetida" + this.input);
                    this.servico.recomendacao =this.input;
                    fetch('http://localhost:3000/services/' + this.servico.id, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: this.servico.toJson()
                    }).catch(err => console.log(err));
                }
                else
                {
                    console.log("Recomendação vazia");
                }
                // isto aqui vai ser para as funções de alterar o estado do serviço
            }
        },

        async created(){
            const store = useFuncionarioStore();
            if (!store.funcionarioLogado){
            
                alert("Login necessário para aceder a esta página");
                this.$router.push('/login');
        
            }
            else{
                await this.loadData()
            }
        }
    }

</script>


<style scoped>

    .caixa-input{
        border-color: rgba(0, 0, 0, 0);
        width: 100%;
        height: 85%;
        background: rgba(0, 0, 0, 0);
        color: rgb(239, 239, 239);
        font-size: 0.8rem;
        font-weight: 500;
        margin-top: 5%
    }

    .caixa-input::placeholder {
        color:rgba(0, 0, 0, 0.7)
    }

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

    .cabecalho_caixa { 
      flex: 17%;
      align-items: center;
      justify-content: center;
      display:flex;
    }
      
    .conteudo_caixa {
      flex: 75%;
      width: 70%;
      align-items: center;
      justify-content: center;
    }

    
    .footer_caixa {
        display: flex;
        align-items: center;
        flex: 15%;
    }
    

    .botao-abaixo {
        margin-bottom: 3%;
    }

    .titulo {
        font-size: 1.8rem;
        font-weight: 500;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        color: rgb(239, 239, 239);
    }

    .estado {
        font-size: 1.5rem;
        font-weight: 500;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        color: rgb(239, 239, 239);
    }

    .selectable_box {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        height: 77%;
        width: 21%;
        background-color: rgba(96, 96, 96, 0.75);
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        border-radius: 20px;
        transition: all 0.3s ease-in;
        margin: 3%;
    }

    .selectable_box:hover {
        background-color: rgba(96, 96, 96, 1);

    }

    .item {
        margin:5px;
    }

    @media screen and ((max-height: 650px) or (max-width: 820px)){
        .texto {
        font-weight: 400;
        overflow-y: auto;
        }

        .titulo {
            font-weight: 400;
        }
      }

    @media screen and (max-width: 900px) {
        .box,.selectable_box {
            width: 40%;
        }
        
    }
</style>
