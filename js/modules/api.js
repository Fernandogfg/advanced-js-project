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
  fetch("https://api.short.io/links", criaPost(link))
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((response) => {
      console.log(response);
      mostraLink(response.shortURL)
    });
}
