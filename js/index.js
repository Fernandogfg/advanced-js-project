import { EnviaLink } from "./modules/api.js";
import { btnCopiar, btnEnviar, inputUrl, linkEncurtado } from "./modules/constantes.js";


btnEnviar.addEventListener("click", function () {
  EnviaLink(inputUrl.value);
});
btnCopiar.addEventListener('click', function(){
  let inputCopiado = document.createElement('input')
  inputCopiado.style.display = 'none'
  inputCopiado.value = linkEncurtado.textContent
  inputCopiado.select()
  inputCopiado.setSelectionRange(0, 99999)
  navigator.clipboard.writeText(inputCopiado.value)
})