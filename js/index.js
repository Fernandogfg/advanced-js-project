import { EnviaLink } from "./modules/api.js";
import { btnCompartilhar, btnCopiar, btnEnviar, btnRedes, inputUrl, linkEncurtado } from "./modules/constantes.js";
import { copiaLink, exibeMsgCopiar, exibeRedes} from "./modules/ui.js";


btnEnviar.addEventListener("click", function () {
  EnviaLink(inputUrl.value);
});
btnCopiar.addEventListener('click', function(){
  copiaLink()
  exibeMsgCopiar()
})
btnCompartilhar.addEventListener('click', function(){
  
})
btnRedes.addEventListener('click', function(){
  exibeRedes()
})