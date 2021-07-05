import axios from "axios";
import React, { useState, useEffect } from "react";
import { HeaderPage } from "../components/HeaderPage";
import { BodyStyled } from "../styles/components/middleSection";
import { MainContainer, Filters, Feed } from "../styles/pages/feed";

interface IPosts {
  id: string;
  title: string;
  price: string;
  location: string;
}

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${process.env.BACKEND_API}/api/services?category=${category}&city=${city}&state=${state}&country=${country}`
      )
      .then(({ data }) => {
        setPosts(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    setFilter(false);
  }, [filter]);

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <Filters>
          <input
            type="text"
            placeholder="Category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="City"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="State"
            onChange={(e) => {
              setState(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Country"
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
          <button onClick={() => setFilter(true)}>Apply Filter</button>
        </Filters>
        {posts.map((post) => (
          <Feed key={post.id}>
            <h2>{post.title}</h2>
            <h3>Category: {post.category}</h3>
            <h3>R$ {post.price}</h3>
            <p>
              {post.city}, {post.state} - {post.country}
            </p>
            <p>
              <strong>Posted by:</strong> {post.User.name}
            </p>
          </Feed>
        ))}
      </MainContainer>
    </BodyStyled>
  );
}
