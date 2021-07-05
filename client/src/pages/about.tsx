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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
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
