import React from "react";

import { BodyStyled } from "../styles/components/middleSection";
import { ImageContainer, Div } from "../styles/pages/contact";

import { Envelope } from "react-bootstrap-icons";
import { Person } from "react-bootstrap-icons";
import { ChatLeftText } from "react-bootstrap-icons";

import { HeaderPage } from "../components/HeaderPage";

export default function Contact() {
  return (
    <BodyStyled>
      <HeaderPage />
      <ImageContainer>
        <Div>
          <div className="container-image">
            <img src="icons/background-contact.png" alt="Background" />
          </div>
          <div className="container">
            <form action="/" method="get" id="contact-form">
              <h1>Contact Us</h1>
              <div>
                <Person size={25} className="icone" />
                <input type="text" id="name" placeholder="Full Name"></input>
              </div>
              <div>
                <Envelope size={25} className="icone" />
                <input
                  type="email"
                  id="email"
                  placeholder="Email - ex: you@email.com"
                ></input>
              </div>
              <div>
                <ChatLeftText size={25} className="icone-message" />
                <textarea
                  itemType="text"
                  className="message"
                  id="message"
                  placeholder="Message :)"
                ></textarea>
              </div>
              <button type="submit" form="contact-form" value="Submit">
                Submit
              </button>
            </form>
            <div className="media-and-location-container">
              <div className="media-container">
                <h2>Social Medias</h2>
                <div>
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
              </div>
              <div className="location-container">
                <h2>Locale</h2>
                <p>
                  Av. Almeida Garret, 267 - Jardim Nossa Sra. Auxiliadora,
                  Campinas - SP, 13087-290.
                </p>
              </div>
            </div>
          </div>
        </Div>
      </ImageContainer>
    </BodyStyled>
  );
}
