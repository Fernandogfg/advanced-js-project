import {
  campoResultado,
  btnEnviar,
  inputUrl,
  linkEncurtado,
  containerBtnCompartilhar,
  sucessoCopiar,
  redesSociais,
  reddit,
  twitter,
  whatsapp,
} from "./constantes.js";

export function alternaBtnEnviar() {
  btnEnviar.toggleAttribute("disabled");
  inputUrl.toggleAttribute("disabled");
  for (const simb of btnEnviar.children) {
    simb.classList.toggle("inativo");
  }
}
export function mostraResposta(link) {
  if (campoResultado.classList.contains("inativo")) {
    campoResultado.classList.toggle("inativo");
  }
  linkEncurtado.innerHTML = link;
  linkEncurtado.setAttribute("href", `${link}`);
  linkEncurtado.setAttribute("target", "blank");
}

export function limpaInputLink() {
  inputUrl.value = "";
}
export function copiaLink() {
  let inputCopiado = document.createElement("input");
  inputCopiado.style.display = "none";
  inputCopiado.value = linkEncurtado.textContent;
  inputCopiado.select();
  inputCopiado.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(inputCopiado.value);
  inputCopiado.remove();
}
export function mostraOpt() {
  containerBtnCompartilhar.classList.remove("inativo");
}
export function exibeMsgCopiar() {
  if (sucessoCopiar.classList.contains("inativo")) {
    sucessoCopiar.classList.toggle("inativo");
    setTimeout(() => {
      sucessoCopiar.classList.toggle("inativo");
    }, 1000);
  }
}
export function exibeRedes (){
  redesSociais.classList.toggle('inativo')
}

export function compartilharLink(){
  reddit.parentElement.setAttribute('href', `https://reddit.com/submit?url=${linkEncurtado.textContent}`)
  reddit.parentElement.setAttribute('target', 'blank')
  twitter.parentElement.setAttribute('href', `https://twitter.com/share?url=${linkEncurtado.textContent}`)
  twitter.parentElement.setAttribute('target', 'blank')
  whatsapp.parentElement.setAttribute('href', `https://wa.me/?text=${linkEncurtado.textContent}`)
  whatsapp.parentElement.setAttribute('target', 'blank')
}