import IProjeto from '@/interfaces/IProjeto';
import { Estado } from '@/store';
import { ALTERAR_PROJETO, CADASTRAR_PROJETO, OBTER_PROJETOS, REMOVER_PROJETO } from '@/store/tipo-acoes';
import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETOS, EXCLUIR_PROJETO } from '@/store/tipo-mutacoes';
import { Module } from 'vuex';
import http from '@/http';

export interface EstadoProjeto {
  projetos: IProjeto[];
}

export const projeto: Module<EstadoProjeto, Estado> = {
  mutations: {
    [ADICIONA_PROJETO](state ,nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto
      } as IProjeto
      state.projetos.push(projeto)
    },
    [ALTERA_PROJETO](state ,projetoAlterado: IProjeto) {
      const index = state.projetos.findIndex(projeto => projeto.id === projetoAlterado.id)
      state.projetos[index] = projetoAlterado;
    },
    [EXCLUIR_PROJETO](state ,id: string) {
      state.projetos = state.projetos.filter(projeto => projeto.id !== id)
    },
    [DEFINIR_PROJETOS](state ,projetos: IProjeto[]) {
      state.projetos = projetos;
    }
  },
  actions: {
    [OBTER_PROJETOS]({ commit }) {
      http.get('/projetos')
        .then(resposta => commit(DEFINIR_PROJETOS, resposta.data))
    },
    [CADASTRAR_PROJETO](contexto, nomeDoProjeto: string) {
      return http.post('/projetos', {
        nome: nomeDoProjeto
      } as IProjeto);
    },
    [ALTERAR_PROJETO](contexto,  projeto: IProjeto) {
      return http.put(`/projetos/${projeto.id}`, projeto);
    },
    [REMOVER_PROJETO]({ commit },  id: number) {
      return http.delete(`/projetos/${id}`)
        .then(() => commit(EXCLUIR_PROJETO, id));
    },
  }
}