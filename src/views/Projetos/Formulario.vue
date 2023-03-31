<template>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label">
          Nome do Projeto
        </label>
        <input 
          type="text"
          class="input"
          v-model="nomeDoProjeto"
          id="nomeDoProjeto"
        >
      </div>
      <div class="field">
        <button 
          class="button"
          type="submit"
        >
          Salvar
        </button>
      </div>
    </form>
</template>
  
<script lang="ts">
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { useStore } from '@/store';
import { defineComponent, ref } from 'vue';
import useNotificador from '@/hooks/notificador';
import { CADASTRAR_PROJETO, ALTERAR_PROJETO } from '@/store/tipo-acoes';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Formulario',
  props: {
    id: {
      type: String
    }
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const { notificar } = useNotificador();

    const nomeDoProjeto = ref('');

    if(props.id) {
      const projeto = store.state.projeto.projetos.find(projeto => projeto.id == props.id)
      nomeDoProjeto.value = projeto?.nome || '';
    }

    const salvar = (): void => {
      if (props.id) {
        store.dispatch(ALTERAR_PROJETO, {
          id: props.id,
          nome: nomeDoProjeto
        })
          .then(() => lidarComSucesso())
      } else {
        store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto)
          .then(() => lidarComSucesso())
      }
    }

    const lidarComSucesso = (): void => {
      nomeDoProjeto.value = '';
      notificar('Novo projeto adicionado', 'Prontinho ;) seu projeto já está disponivel', TipoNotificacao.SUCESSO);
      router.push('/projetos');
    }

    return {
      nomeDoProjeto,
      salvar
    }
  }
});
</script>

<style scoped>
.projetos {
  padding: 1.25rem;
}
</style>