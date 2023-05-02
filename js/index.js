import { EnviaLink } from "./modules/api.js";
import { config } from "./modules/config.js";
import { btnEnviar, inputUrl } from "./modules/constantes.js";

btnEnviar.addEventListener('click', function(){
  EnviaLink(inputUrl.value)
})