import { EnviaLink, deletar, gerarQR, listaLinks } from "./modules/api.js";
import {
  btnCopiar,
  btnEnviar,
  btnNaoDeletar,
  btnOpt,
  btnQRCode,
  btnRedes,
  deletarModal,
  inputUrl,
} from "./modules/constantes.js";
import {
  compartilharLink,
  copiaLink,
  escondeEncurtamento,
  exibeMsgCopiar,
  exibeRedes,
  saiModal,
} from "./modules/ui.js";

btnEnviar.addEventListener("click", function () {
  EnviaLink(inputUrl.value);
});
btnCopiar.addEventListener("click", function () {
  copiaLink();
  exibeMsgCopiar();
});

btnRedes.addEventListener("click", function () {
  exibeRedes();
  compartilharLink();
});
btnQRCode.addEventListener("click", function () {
  gerarQR();
});
btnOpt.addEventListener("click", function () {
  escondeEncurtamento();
  listaLinks();
});
btnNaoDeletar.addEventListener('click', function(){
  deletarModal.classList.toggle('inativo')
})