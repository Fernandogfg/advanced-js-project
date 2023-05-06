import { config } from "./config.js";
import { imgQRCode } from "./constantes.js";
import {
  alternaBtnEnviar,
  exibeCodigoQR,
  limpaInputLink,
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
