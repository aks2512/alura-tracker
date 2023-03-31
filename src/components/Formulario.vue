<template>
    <div class="box formulario">
        <div class="columns">
            <div 
                class="column is-5"
                role="form"
                aria-label="Formulário para criação de uma nova tarefa"
            >
                <input 
                    type="text"
                    class="input"
                    placeholder="Qual tarefa você deseja iniciar?"
                    v-model="descricao"
                />
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                        <option
                        :value="projeto.id"
                        v-for="projeto in projetos"
                        :key="projeto.id"
                        >
                        {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useStore } from '@/store';
    import Temporizador from './Temporizador.vue';

    export default defineComponent({
        name: 'Formulario',
        imits: ['aoSalvarTarefa'],
        components: {
            Temporizador
        },
        setup(props, { emit }) {
            const store = useStore();

            const descricao = ref('');
            const idProjeto = ref('');
            const projetos = computed(() => store.state.projeto.projetos);

            const finalizarTarefa = (tempoDecorrido: number): void => {
                emit('aoSalvarTarefa', {
                    duracaoEmSegundos: tempoDecorrido,
                    descricao: descricao,
                    projeto: projetos.value.find((projeto) => projeto.id === idProjeto.value)
                })
                descricao.value = '';
            }

            return {
                descricao,
                idProjeto,
                projetos,
                finalizarTarefa
            }
        }
    });
</script>

<style>
    .formulario {
        color: var(--texto-primario);
        background-color: var(--bg-primario);
    }
</style>