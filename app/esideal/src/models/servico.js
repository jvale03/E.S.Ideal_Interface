export class Servico{
    id=null;
    estado = "nafila";
    tipo = "";
    agendamento = "filaDeEspera";
    data = null;
    descricao = null;
    matricula = null;
    motivo = null;
    recomendacao = null;

    constructor() {

    }

    suspender(motivo) {
        if (motivo !=='')
        {
            this.motivo = motivo;
        }
        this.estado = "suspenso";
    }

    voltar(){
        this.estado = "iniciado";
        this.motivo = null;
    }

    toJson(){
        let res = {
            id: this.id,
            estado: this.estado,
            serviceDefinitionId: this.tipo,
            agendamento: this.agendamento,
            descricao: this.descricao,
            vehicleId: this.matricula,
        }
        if (this.data != null){
            console.log(this.data);
            res.data = this.data;
        }
        if (this.estado==='suspenso' && this.motivo != null){
            res.motivo = this.motivo;
        }
        if (this.estado==='realizado' && this.recomendacao != null){
            res.recomendacao = this.recomendacao;
        }
        return JSON.stringify(res);
        
    }


}