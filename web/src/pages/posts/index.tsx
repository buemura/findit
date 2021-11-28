import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import { MainContainer, ContainerFilters, Filters, Feed, Title } from "../../styles/pages/posts";
import { FormatDate } from "../../utils/formatDate";
import { Services } from "../../api/services";
import { Categories } from "../../api/categories";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (query.Category) {
    let { Category } = query;
    return {
      props: { Category },
    };
  }
  return { props: { Category: "" } };
};

export default function Posts({ Category }) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(Category);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [filter, setFilter] = useState(false);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mySpan, setMySpan] = useState("show");

  useEffect(() => {
    (async () => {
      const data = await Services.getServices(
        title,
        category,
        city,
        state,
        country
      );
      
      const allCategories = await Categories.getAllCategories();
      setFilter(false);
      setCategories(allCategories);
      setPosts(data);
      console.log(categories);
      console.log(posts);
    })();
  }, [filter]);

  useEffect(() => {
    console.log(categories);
    console.log(posts);
  }, [posts]);

  function getSelectOption() {
    let option_value = document.getElementById("select--category") as HTMLSelectElement;
    let text: string = option_value.options[option_value.selectedIndex].text;
    setCategory(text);
    if (text === "") {
      setMySpan("show");
    } else {
      setMySpan("not-show")
    }
    console.log(category);    
  }

  function formatImageName(category: string): string {
    return category.replace(/ /g, "-").replace("&", "e").toLowerCase();
  }

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <Filters>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <div className="div-select">
            <span className={mySpan}>Category</span>
            <select name="category" id="select--category" onChange={() => { getSelectOption(); }}>
              <option value=""></option>
              {categories.map((c) => (
                <option value={c.category} key={c.category}>
                  {c.category}
                </option>
              ))}
            </select>
          </div>
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
        <ContainerFilters>
          {posts.length != 0 ? (
            posts.map((post) => (
              <Feed
                key={post.id}
                onClick={() => router.push(`/posts/${post.id}`)}
              >
                {categories.map((c) =>
                  c.category === post.category ? (
                    <div
                      key={c.id}
                      className="category-image"
                      style={{
                        backgroundImage: `url(icons/categories/${formatImageName(
                          c.category
                        )}.png)`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                    ></div>
                  ) : (
                    <div key={c.id}></div>
                  )
                )}
                <div className="category-container">
                  <h2>{post.title}</h2>
                  <div>
                    <div className="div-city">
                      <h3>Category: {post.category}</h3>
                      <p>
                        {post.city}, {post.state} - {post.country}
                      </p>
                    </div>
                    <div>
                      <h3>R$ {post.price}</h3>
                      <p>
                        <strong>Posted by: </strong>
                        {post.user.name}
                      </p>
                    </div>
                    <div className="div-date">
                      <p>{FormatDate.calculateDate(post.created_at)}</p>
                    </div>
                  </div>
                </div>
              </Feed>
            ))
          ) : (
            <Title>
              <h1>No service posted yet</h1>
            </Title>
          )}
        </ContainerFilters>
      </MainContainer>
    </BodyStyled>
  );
}
