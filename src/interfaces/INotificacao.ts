export enum TipoNotificacao {
  SUCESSO,
  FALHA,
  ATENCAO
}

export interface INotificao {
  id: number
  titulo: string,
  texto: string,
  tipo: TipoNotificacao,
}