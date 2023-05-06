import { EnviaLink, gerarQR } from "./modules/api.js";
import { btnCopiar, btnEnviar, btnQRCode, btnRedes, inputUrl, linkEncurtado } from "./modules/constantes.js";
import { compartilharLink, copiaLink, exibeMsgCopiar, exibeRedes} from "./modules/ui.js";


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