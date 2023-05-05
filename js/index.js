import { EnviaLink } from "./modules/api.js";
import { btnEnviar, inputUrl } from "./modules/constantes.js";

btnEnviar.addEventListener("click", function () {
  EnviaLink(inputUrl.value);
});
