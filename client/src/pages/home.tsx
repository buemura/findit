import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { HeaderPage } from "../components/HeaderPage";
import { BodyStyled } from "../styles/components/middleSection";
import {
  MainContainer,
  CategoryList,
  MainSection,
  ListItem,
} from "../styles/pages/home";

export default function HomePage() {
  const items = [
    "Assistência Técnica",
    "Aulas",
    "Autos",
    "Consultoria",
    "Design e Tenologia",
    "Eventos",
    "Moda e Beleza",
    "Reformas",
    "Saúde",
    "Serviços Domésticos",
  ];
  const [usersQuantity, setUsersQuantity] = useState([]);
  const [servicesQuantity, setServicesQuantity] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.BACKEND_API}/api/users/all/count`)
      .then((res) => {
        setUsersQuantity(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${process.env.BACKEND_API}/api/services/all/count`)
      .then((res) => {
        setServicesQuantity(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <CategoryList>
          {items.map((i) => (
            <ListItem key={i}>
              <img src={`icons/categories/${i}.png`} alt={i} />
              <p>{i}</p>
            </ListItem>
          ))}
        </CategoryList>
        <MainSection>
          <div className="main-texts">
            <p>Post your project oportunity and interact with freelancers!</p>
            <p>Find the best freelancers in the market now!</p>
          </div>
          <div className="button-information">
            <div className="buttons-container">
              <Link href="/posts" passHref>
                <button className="post-services">Post Services</button>
              </Link>
              <Link href="/feed" passHref>
                <button className="find-services">Find Services</button>
              </Link>
            </div>
            <div className="system-information">
              <p>Freelancers registered: {usersQuantity}</p>
              <p>Projects posted: {servicesQuantity}</p>
            </div>
          </div>
        </MainSection>
      </MainContainer>
    </BodyStyled>
  );
}
