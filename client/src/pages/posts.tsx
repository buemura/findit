import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import { HeaderPage } from "../components/HeaderPage";
import { BodyStyled } from "../styles/components/middleSection";
import {
  MainContainer,
  ServiceTitle,
  ServiceImage,
  ServiceCategory,
  ServiceDescription,
  ServicePrice,
  ServiceLocation,
} from "../styles/pages/posts";
import authentication from "../services/authentication";

interface IPosts {
  name: string;
  email: string;
  location: string;
  phone: string;
  occupation: string;
  about_me: string;
  user_photo: string;
}

export default function Posts() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  /**
   * Token is needed in order to make a POST, PUT or DELETE request.
   * Also this token expires in 1 hour. Sign in again to generate a new one.
   * The token is associated with the user. So if we decode this token, we will be able to retrieve user ID and Email.
   */
  let token;
  let tokenDecoded: any;
  let id, exp;

  // Check if the user is logged and the jwt expiration with jwt.exp.
  const checkUserSession = () => {
    if (localStorage.getItem("token") === null) {
      alert("Your need to sign in to proceed!");
      router.push("/login");
      return;
    }
    token = localStorage.getItem("token");
    tokenDecoded = jwt_decode(token);
    id = tokenDecoded.id;
    exp = tokenDecoded.exp;

    // Check the session expiration with jwt.exp.
    const currentTimestamp = new Date().getTime() / 1000;
    if (exp < currentTimestamp) {
      alert("Your session expired, Sign in again to continue!");
      localStorage.removeItem("token");
      router.push("/login");
      return;
    }
  };

  const postService = () => {
    checkUserSession();
    axios
      .post(
        `${process.env.BACKEND_API}/api/services`,
        {
          user_id: id,
          title,
          category,
          description,
          price,
          city,
          state,
          country,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(({ data }) => {
        alert("Your service was posted successfully!");
      })
      .catch((err) => {
        alert(
          "Unable to post service. Check the information and try again later!"
        );
      });
  };

  useEffect(() => {
    checkUserSession();
  }, []);

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <ServiceTitle>
          <p>Service title*</p>
          <input
            type="text"
            name="title"
            placeholder="Web Site Development"
            onChange={(e) => setTitle(e.target.value)}
          />
        </ServiceTitle>
        <ServiceImage>
          <p>Service images </p>
          <button>Add +</button>
        </ServiceImage>
        <ServiceCategory>
          <p>Category* </p>
          <input
            type="text"
            name="service-category"
            placeholder="Software Development"
            onChange={(e) => setCategory(e.target.value)}
          />
        </ServiceCategory>
        <ServiceDescription>
          <p>Description* </p>
          <input
            type="text"
            name="service-description"
            placeholder="I need a web site development for my company"
            onChange={(e) => setDescription(e.target.value)}
          />
        </ServiceDescription>
        <ServicePrice>
          <p>Price* </p>
          <input
            type="text"
            name="service-price"
            placeholder="R$ 500,00"
            onChange={(e) => setPrice(e.target.value)}
          />
        </ServicePrice>
        <ServiceLocation>
          <p>Location* </p>
          <input
            type="text"
            name="service-city"
            placeholder="Campinas"
            id="city"
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            name="service-state"
            placeholder="SP"
            id="state"
            onChange={(e) => setState(e.target.value)}
          />
          <input
            type="text"
            name="service-country"
            placeholder="Brazil"
            id="country"
            onChange={(e) => setCountry(e.target.value)}
          />
        </ServiceLocation>
        <button onClick={postService}>Post Service</button>
      </MainContainer>
    </BodyStyled>
  );
}
