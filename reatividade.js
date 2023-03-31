const { set } = require("core-js/core/dict");

const projeto = {
  id: 1,
  descricao: 'Alura Tracker'
}

const proxy = new Proxy(projeto, {
  get(objetoOriginal, chave, receptor) {
    return Reflect.get(objetoOriginal, chave, receptor);
  },
  set(objetoOriginal, chave, valor) {
    objetoOriginal[chave] = valor;
  }
})