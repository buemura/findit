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
import { Authentication } from "../api/authentication";
import { Users } from "../api/users";
import { Services } from "../api/services";
import { Categories } from "../api/categories";
import router from "next/router";

export default function HomePage() {
  const [usersQuantity, setUsersQuantity] = useState<number>(0);
  const [servicesQuantity, setServicesQuantity] = useState<number>(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const usersCount = await Users.getUsersCount();
      const servicesCount = await Services.getServicesCount();
      const allCategories = await Categories.getAllCategories();

      setUsersQuantity(usersCount);
      setServicesQuantity(servicesCount);

      if (allCategories) {
        setCategories(allCategories);
      }
    })();
  }, []);

  function formatImageName(category: string): string {
    return category.replace(/ /g, "-").replace("&", "e").toLowerCase();
  }

  function redirectToPosts(category: string) {
    router.push(`/posts?Category=${category.replaceAll("&", "e")}`);
  }

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <CategoryList>
          {categories.length > 0 ? (
            categories.map((c) => (
              <ListItem key={c.category}>
                <img
                  src={`/icons/categories/${formatImageName(c.category)}.png`}
                  alt={c.category}
                  onClick={() => {
                    redirectToPosts(c.category);
                  }}
                />
                <p>{c.category}</p>
              </ListItem>
            ))
          ) : (
            <div></div>
          )}
        </CategoryList>
        <MainSection>
          <div className="main-texts">
            <p>Post your project oportunity and interact with freelancers!</p>
            <p>Find the best freelancers in the market now!</p>
          </div>
          <div className="button-information">
            <div className="buttons-container">
              <button
                className="post-services"
                onClick={() => Authentication.checkUserSession("create-post")}
              >
                Post Services
              </button>
              <Link href="/posts" passHref>
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
