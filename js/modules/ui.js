import { deletar, editaLink } from "./api.js";
import { config } from "./config.js";
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
  imgQRCode,
  downloadQR,
  encurtamento,
  tabelaLinks,
  dominio,
  gerenciamento,
  editar,
  inputPath,
  inputURLModal,
  btnSalvar,
  blurClick,
  deletarModal,
  btnDeletar,
  tituloEdicao,
  tituloApagar,
  msgSucesso,
  msgErro,
  dataEncurtamento,
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
  const dia = new Date().getDate();
  const mes = new Date().getMonth() + 1;
  const ano = new Date().getFullYear();
  const hora = new Date().getHours();
  const min = new Date().getMinutes();
  const data = `${dia}/${mes}/${ano}`;
  dataEncurtamento.innerHTML = `Encurtado em${data} às ${hora}:${min}`;
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
      sucessoCopiar.classList.toggle("animate__fadeOut");
    }, 1000);
    setTimeout(() => {
      sucessoCopiar.classList.toggle("inativo");
      sucessoCopiar.classList.remove("animate__fadeOut");
    }, 2000);
  }
}
export function exibeRedes() {
  if (!imgQRCode.classList.contains("inativo")) {
    imgQRCode.classList.add("inativo");
    downloadQR.classList.add("inativo");
  }
  redesSociais.classList.toggle("inativo");
}

export function compartilharLink() {
  reddit.parentElement.setAttribute(
    "href",
    `https://reddit.com/submit?url=${linkEncurtado.textContent}`
  );
  reddit.parentElement.setAttribute("target", "blank");
  twitter.parentElement.setAttribute(
    "href",
    `https://twitter.com/share?url=${linkEncurtado.textContent}`
  );
  twitter.parentElement.setAttribute("target", "blank");
  whatsapp.parentElement.setAttribute(
    "href",
    `https://wa.me/?text=${linkEncurtado.textContent}`
  );
  whatsapp.parentElement.setAttribute("target", "blank");
}

export function exibeCodigoQR(codigo) {
  if (!redesSociais.classList.contains("inativo")) {
    redesSociais.classList.add("inativo");
  }
  const imgURL = URL.createObjectURL(codigo);
  imgQRCode.src = `${imgURL}`;
  imgQRCode.classList.remove("inativo");
  downloadQR.setAttribute("href", `${imgQRCode.src}`);
  downloadQR.classList.remove("inativo");
}
export function escondeEncurtamento() {
  encurtamento.classList.toggle("inativo");
  gerenciamento.classList.toggle("inativo");
  dominio.innerHTML = `Domínio: <a href="${config.API_DOMAIN}">${config.API_DOMAIN}</a>`;
}
export function saiModal() {
  blurClick.forEach((blur) => {
    blur.addEventListener("click", function () {
      if (!blur.parentElement.classList.contains("inativo")) {
        blur.parentElement.classList.add("inativo");
      }
    });
  });
}
function MostraModalEditar(idString, path, originalURL, shortURL) {
  editar.classList.toggle("inativo");
  tituloEdicao.innerHTML = `Editando <a href="${shortURL}">${shortURL}</a>`;
  inputPath.value = path;
  inputURLModal.value = originalURL;
  saiModal();
  btnSalvar.onclick = () =>
    editaLink(idString, inputPath.value, inputURLModal.value);
}
function MostraModalApagar(idString, shortURL) {
  deletarModal.classList.toggle("inativo");
  tituloApagar.innerHTML = `Deseja Excluir o link: <a href ="${shortURL}">${shortURL}</a>?`;
  saiModal();
  btnDeletar.onclick = () => {
    deletar(idString);
  };
}
export function imprimeLista(lista) {
  tabelaLinks.innerHTML = "";
  for (let link of lista.links) {
    let data = new Date(link.updatedAt);
    tabelaLinks.innerHTML += `<tr><td>${
      link.shortURL
    }</td><td class="propriedadeTabela">${
      link.originalURL
    }</td><td>${data.toLocaleDateString()}</td><td class="acao"><img src="assets/icons/edit.svg" class='editBtn' idString='${
      link.idString
    }' path='${link.path}' originalURL='${
      link.originalURL
    }' title="Editar" shortURL="${link.shortURL}"><img idString = '${
      link.idString
    }' class="apagarBtn" shortURL ="${
      link.shortURL
    }" src="assets/icons/trash.svg" title="Apagar"></td></tr>`;
  }
  adicionaEventos();
}
function adicionaEventos() {
  let editBtn = document.querySelectorAll(".editBtn");
  let apagarBtn = document.querySelectorAll(".apagarBtn");
  editBtn.forEach((btn) => {
    const idString = btn.getAttribute("idString");
    const path = btn.getAttribute("path");
    const originalURL = btn.getAttribute("originalURL");
    const shortURL = btn.getAttribute("shortURL");
    btn.addEventListener("click", function () {
      MostraModalEditar(idString, path, originalURL, shortURL);
    });
  });
  apagarBtn.forEach((btn) => {
    const idString = btn.getAttribute("idString");
    const shortURL = btn.getAttribute("shortURL");
    btn.addEventListener("click", function () {
      MostraModalApagar(idString, shortURL);
    });
  });
}

export function home() {
  if (!gerenciamento.classList.contains("inativo")) {
    gerenciamento.classList.add("inativo");
  }

  if (encurtamento.classList.contains("inativo")) {
    encurtamento.classList.toggle("inativo");
  }

  limpaInputLink();

  if (!imgQRCode.classList.contains("inativo")) {
    imgQRCode.classList.toggle("inativo");
    downloadQR.classList.toggle("inativo");
  }
  if (!campoResultado.classList.contains("inativo")) {
    campoResultado.classList.toggle("inativo");
  }
  if (!containerBtnCompartilhar.classList.contains("inativo")) {
    containerBtnCompartilhar.classList.toggle("inativo");
  }
  if (!redesSociais.classList.contains("inativo")) {
    redesSociais.classList.toggle("inativo");
  }
}
export function mostraMsgSucesso() {
  if (msgSucesso.classList.contains("inativo")) {
    msgSucesso.classList.toggle("inativo");
    setTimeout(() => {
      msgSucesso.classList.add("animate__fadeOut");
    }, 1500);
    setTimeout(() => {
      msgSucesso.classList.add("inativo");
      msgSucesso.classList.remove("animate__fadeOut");
    }, 2000);
  }
}
export function mostraMsgErro() {
  if (msgErro.classList.contains("inativo")) {
    msgErro.classList.toggle("inativo");
    setTimeout(() => {
      msgErro.classList.toggle("inativo");
    }, 1500);
  }
}


