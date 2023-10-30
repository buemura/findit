import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { HeaderPage } from "../../../components/HeaderPage";
import { BodyStyled } from "../../../styles/components/middleSection";
import {
  MainContainer,
  Filters,
  Feed,
  Title,
} from "../../../styles/pages/my-favorites";
import { FormatDate } from "../../../utils/formatDate";
import { Services } from "../../../api/services";
import { Categories } from "../../../api/categories";
import { Authentication } from "../../../api/authentication";
import { url } from "inspector";

export default function Posts() {
  const router = useRouter();
  const [myId, setMyId] = useState<string>("");

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState(false);
  const [categories, setCategories] = useState([]);

  const [view, setView] = useState("posts");

  useEffect(() => {
    (async () => {
      const id: string = Authentication.checkUserSession("");
      setMyId(id);
      const data = await Services.getAllServicesByUserID(id);
      const allCategories = await Categories.getAllCategories();
      setCategories(allCategories);
      setPosts(data);
      setFilter(false);
      console.log(data);
    })();
  }, [filter]);

  function formatImageName(category: string): string {
    return category.replace(/ /g, "-").replace("&", "e").toLowerCase();
  }

  async function deleteService(service_id: string): Promise<void> {
    const token: string = localStorage.getItem("token");
    await Services.deleteService(service_id, token);
    document.location.reload();
  }

  function showPosts() {
    return posts.length != 0 ? (
      posts.map((post) => (
        <Feed key={post.id}>
          {categories.map((c) =>
            c.category === post.category ? (
              <div
                key={c.id}
                className="category-image"
                style={{
                  backgroundImage: `url(/icons/categories/${formatImageName(
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

              <div className="buttons">
                <button onClick={() => router.push(`/posts/${post.id}`)}>
                  Show
                  <img className="div-icon-show" src="/icons/file.png" />
                </button>
                <button
                  onClick={() => router.push(`/posts/my-posts/${post.id}`)}
                >
                  Edit
                  <img className="div-icon-edit" src="/icons/pencil.png" />
                </button>
                <button
                  onClick={() => {
                    deleteService(post.id);
                  }}
                >
                  Remove
                  <img className="div-icon-remove" src="/icons/trash-bin.png" />
                </button>
              </div>
            </div>
          </div>
        </Feed>
      ))
    ) : (
      <Title>
        <h1>No service posted yet</h1>
      </Title>
    );
  }

  function showUsers() {}

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <div style={{ width: "100%", marginTop: "35px" }} className="h1-page">
          <h1>My Favorites</h1>
          <div className="change--view">
            <div
              className={view === "posts" ? "options checked" : "options"}
              id="opt1"
              onClick={() => {
                setView("posts");
              }}
            >
              Posts
            </div>
            <div
              className={view === "users" ? "options checked" : "options"}
              id="opt2"
              onClick={() => {
                setView("users");
              }}
            >
              Users
            </div>
          </div>
        </div>
        {view === "posts" ? showPosts() : showUsers()}
      </MainContainer>
    </BodyStyled>
  );
}
