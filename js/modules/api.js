import { config } from "./config.js";
import { mostraLink } from "./ui.js";

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
  try{
    if(link.value == ""){
      throw new Error('Preencha o campo com uma URL valida')
    }
    fetch("https://api.short.io/links", criaPost(link))
    .then((response) => {
      if(response.ok && response.status == 200){
        return response.json();
      }
      throw new Error('Algo deu errado, tente novamente');
    })
    .then((response) => {
      console.log(response);
      mostraLink(response.shortURL)
    }).catch((error)=>{
      alert(error)
    });
  }
  
}
