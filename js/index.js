import { EnviaLink, gerarQR } from "./modules/api.js";
import { btnCopiar, btnEnviar, btnOpt, btnQRCode, btnRedes, inputUrl} from "./modules/constantes.js";
import { compartilharLink, copiaLink, escondeEncurtamento, exibeMsgCopiar, exibeRedes} from "./modules/ui.js";


btnEnviar.addEventListener("click", function () {
  EnviaLink(inputUrl.value);
});
btnCopiar.addEventListener('click', function(){
  copiaLink()
  exibeMsgCopiar()
})

btnRedes.addEventListener('click', function(){
  exibeRedes()
  compartilharLink()
})
btnQRCode.addEventListener('click', function(){
  gerarQR()
})
btnOpt.addEventListener('click', function(){
  escondeEncurtamento()
})