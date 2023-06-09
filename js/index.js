import { EnviaLink, deletar, gerarQR, listaLinks } from "./modules/api.js";
import {
  blurClick,
  btnCopiar,
  btnEnviar,
  btnNaoDeletar,
  btnOpt,
  btnQRCode,
  btnRedes,
  deletarModal,
  inputUrl,
  logo,
} from "./modules/constantes.js";
import {
  compartilharLink,
  copiaLink,
  escondeEncurtamento,
  exibeMsgCopiar,
  exibeRedes,
  home,
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
btnNaoDeletar.addEventListener("click", function () {
  deletarModal.classList.toggle("inativo");
});

logo.addEventListener("click", function () {
  home();
});
document.addEventListener("keydown", function (el) {
  if (el.key == "Escape") {
    blurClick.forEach((blur) => {
      if (!blur.classList.contains("inativo")) {
        blur.parentElement.classList.add("inativo");
      }
    });
  }
});
