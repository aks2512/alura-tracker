import { INotificao } from '@/interfaces/INotificacao';
import IProjeto from '@/interfaces/IProjeto';
import { InjectionKey } from 'vue';
import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, NOTIFICAR } from './tipo-mutacoes';

interface Estado {
  projetos: IProjeto[],
  notificacoes: INotificao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    projetos: [],
    notificacoes: []
  },
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
    [NOTIFICAR](state ,novaNotificacao: INotificao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id);
      }, 3000)
    }
  }
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}