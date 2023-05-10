import { config } from "./config.js";
import { deletarModal, editar, imgQRCode } from "./constantes.js";
import {
  alternaBtnEnviar,
  exibeCodigoQR,
  imprimeLista,
  limpaInputLink,
  mostraMsgErro,
  mostraMsgSucesso,
  mostraOpt,
  mostraResposta,
} from "./ui.js";

const criaPost = function (link) {
  const objData = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `${config.API_KEY}`,
    },
    body: JSON.stringify({
      domain: `${config.API_DOMAIN}`,
      originalURL: `${link}`,
    }),
  };
  return objData;
};
let linkIdString = "";
export function EnviaLink(link) {
  try {
    alternaBtnEnviar();
    if (link == "") {
      throw new Error("Preencha o campo com uma URL valida");
    }
    fetch("https://api.short.io/links", criaPost(link))
      .then((response) => {
        if (response.ok && response.status == 200) {
          return response.json();
        }
        throw new Error("Algo deu errado, tente novamente");
      })
      .then((response) => {
        mostraResposta(response.shortURL);
        alternaBtnEnviar();
        limpaInputLink();
        mostraOpt();
        linkIdString = response.idString;
      })
      .catch((error) => {
        alternaBtnEnviar();
        alert(error);
        limpaInputLink();
      });
  } catch (e) {
    alternaBtnEnviar();
    alert(e);
    limpaInputLink();
  }
}

const optQRCode = function () {
  const options = {
    method: "POST",
    headers: {
      accept: "image/png",
      "content-type": "application/json",
      authorization: `${config.API_KEY}`,
    },
    body: JSON.stringify({ type: "png" }),
  };
  return options;
};

export function gerarQR() {
  fetch(`https://api.short.io/links/qr/${linkIdString}`, optQRCode())
    .then((response) => response.blob())
    .then((response) => {
      exibeCodigoQR(response);
    })
    .catch((err) => alert(err));
}
const optionsListaLinks = {
  method: "GET",
  headers: { accept: "application/json", authorization: `${config.API_KEY}` },
};

export function listaLinks() {
  fetch(
    "https://api.short.io/api/links?domain_id=710819&limit=5&dateSortOrder=desc",
    optionsListaLinks
  )
    .then((response) => response.json())
    .then((response) => {
      imprimeLista(response);
    })
    .catch((err) => console.error(err));
}
export function editaLink(idString, path, originalURL) {
  console.log(idString, path, originalURL);
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `${config.API_KEY}`,
    },
    body: JSON.stringify({ originalURL: `${originalURL}`, path: `${path}` }),
  };
  fetch(`https://api.short.io/links/${idString}`, options)
    .then((response) => {
      if (response.status == 200 && response.ok) {
        console.log(response);
        return response.json();
      }
      throw new Error("erro");
    })
    .then((response) => {
      editar.classList.toggle("inativo");
      listaLinks();
      mostraMsgSucesso()
    })
    .catch((err) => mostraMsgErro());
}

export function deletar(idString) {
  const options = { method: "DELETE",headers: {authorization: `${config.API_KEY}`} };

  fetch(`https://api.short.io/links/${idString}`, options)
    .then((response) => response.json())
    .then((response) => {
      listaLinks()
      deletarModal.classList.toggle('inativo')
      mostraMsgSucesso()
    })
    .catch((err) => mostraMsgErro());
}
