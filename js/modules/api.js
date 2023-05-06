import { config } from "./config.js";
import {alternaBtnEnviar, limpaInputLink, mostraOpt, mostraResposta } from "./ui.js";

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

export function EnviaLink(link) {
  try {
    alternaBtnEnviar()
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
        console.log(response);
        mostraResposta(response.shortURL);
        alternaBtnEnviar()
        limpaInputLink()
        mostraOpt()
      })
      .catch((error) => {
        alternaBtnEnviar()
        alert(error);
        limpaInputLink()
        
      });
  } catch (e) {
    alternaBtnEnviar()
    alert(e);
    limpaInputLink()
  }
}
