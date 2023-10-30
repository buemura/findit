import React from "react";

import { HeaderPage } from "../components/HeaderPage";

import { Div } from "../styles/pages/about";
import { BodyStyled, MiddleSection } from "../styles/components/middleSection";

export default function About() {
  return (
    <BodyStyled>
      <HeaderPage />
      <MiddleSection>
        <Div>
          <h1 className="title">Find It</h1>
          <p className="presentation">
            Esta aplicação é uma Plataforma para Anúncio de Serviços na qual simplifica a busca e publicação de serviços autônomos. Conta também com um gerenciador de serviços para garantir maior controle sobre os trabalhos executados e requeridos, sistema de conversa para comunicação entre solicitante e prestador de serviço, compatibilidade com todos os equipamentos que possuam acesso à internet, permitindo que qualquer pessoa com cadastro possa realizar publicações na página independente da categoria do serviço, possibilitando visibilidade à prestadores de serviços autônomos.

          </p>
          <p className="social-media-message">Get to know our social pages.</p>
          <div className="images-container">
            <a href="https://www.facebook.com/">
              <img src="icons/facebook.png" alt="Facebook"></img>
            </a>
            <a href="https://www.instagram.com/">
              <img src="icons/instagram.png" alt="Instagram"></img>
            </a>
            <a href="https://www.twitter.com/">
              <img src="icons/twitter.png" alt="Twitter"></img>
            </a>
          </div>
        </Div>
      </MiddleSection>
    </BodyStyled>
  );
}
