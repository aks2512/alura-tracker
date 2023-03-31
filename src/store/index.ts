import { INotificao } from '@/interfaces/INotificacao';
import { InjectionKey } from 'vue';
import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { NOTIFICAR } from './tipo-mutacoes';
import { EstadoProjeto, projeto } from './modulos/projeto';
import { EstadoTarefa, tarefa } from './modulos/tarefa';

export interface Estado {
  notificacoes: INotificao[],
  tarefa: EstadoTarefa,
  projeto: EstadoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
  state: {
    notificacoes: [],
    projeto: {
      projetos: []
    },
    tarefa: {
      tarefas: []
    }
  },
  mutations: {
    [NOTIFICAR](state ,novaNotificacao: INotificao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);
      
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id);
      }, 3000)
    }
  },
  modules: {
    projeto,
    tarefa
  }
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}