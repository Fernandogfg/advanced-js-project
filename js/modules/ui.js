import {
  CampoResultado,
  btnEnviar,
  inputUrl,
  linkEncurtado,
} from "./constantes.js";

export function alternaBtnEnviar() {
  btnEnviar.toggleAttribute("disabled");
  inputUrl.toggleAttribute("disabled");
  for (const simb of btnEnviar.children) {
    simb.classList.toggle("inativo");
  }
}
export function mostraResposta(link) {
  if(CampoResultado.classList.contains('inativo')){
    CampoResultado.classList.toggle('inativo')
  }
  linkEncurtado.innerHTML = link;
  linkEncurtado.setAttribute("href", `${link}`);
  linkEncurtado.setAttribute('target', 'blank');
}

export function limpaInputLink (){
    inputUrl.value = ''
}