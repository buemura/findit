import React, { useState, useEffect } from "react";
import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import {
  CommentsContainer,
  MainContainer,
  Post,
  PostComments,
} from "../../styles/pages/posts-message";
import { GetServerSideProps } from "next";
import { FormatDate } from "../../utils/formatDate";
import { useRouter } from "next/router";
import { Authentication } from "../../api/authentication";
import { Comments } from "../../api/comments";
import { Services } from "../../api/services";
import { url } from "inspector";
import { IServiceData } from "../../config/interfaces";

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  const { id } = params;
  return {
    props: { id },
  };
};

export default function PostDetails({ id }) {
  const router = useRouter();

  const [post, setPost] = useState<IServiceData>({
    id: "",
    user_id: "",
    title: "",
    category: "",
    description: "",
    price: "",
    city: "",
    state: "",
    country: "",
    created_at: "",
    updated_at: "",
    user: {
      id: "",
      name: "",
      email: "",
      user_photo: "",
      city: "",
      state: "",
      country: "",
      phone: "",
      occupation: "",
      about_me: "",
      email_verified: "",
      created_at: "",
      updated_at: "",
      deleted_at: "",
    },
  });
  const [comment, setComment] = useState<string>("");
  const [postedComments, setPostedComments] = useState([]);

  useEffect(() => {
    (async () => {
      const postData = await Services.getServiceByID(id);
      const commentsData = await Comments.getAllComments(id);
      setPost(postData);
      setPostedComments(commentsData);
    })();
  }, []);

  async function postComment(): Promise<void> {
    const myId = Authentication.checkUserSession("");
    const token: string = localStorage.getItem("token");

    if (myId === post.user_id) {
      alert("You cannot post a comment on your own service!");
      return;
    }

    if (comment === "") {
      alert("Comment is empty, please check");
      return;
    }

    await Comments.createComment(id, myId, comment, token);
    window.location.reload();
  }

  function redirectToUserProfile(userId: string): void {
    const myId = Authentication.checkUserSession("");

    if (myId === userId) {
      router.push("/profile");
      return;
    }
    router.push(`/profile/${userId}`);
    return;
  }

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <Post>
          <div>
            <h2>{post.title}</h2>
            <h3>Category: {post.category}</h3>
            <p>{post.description}</p>
            <p>
              {post.city}, {post.state} - {post.country}
            </p>
          </div>
          <div className="div-price">
            <h3>R$ {post.price}</h3>
            <p>
              <strong
                onClick={() => {
                  redirectToUserProfile(post.user.id);
                }}
              >
                Posted by:{" "}
              </strong>
              {post.user.name}
            </p>
          </div>
          <div className="div-date">
            <p>{FormatDate.calculateDate(post.created_at)}</p>
          </div>
        </Post>
        <PostComments>
          <label>Post a comment</label>
          <div>
            <input
              type="text"
              name="text"
              onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={postComment}>Comment</button>
          </div>
        </PostComments>
        {postedComments.map((com) => (
          <CommentsContainer
            key={com.id}
            onClick={() => redirectToUserProfile(com.user.id)}
          >
            {/* <img
              src={`${process.env.BACKEND_API}/api/users/${com.user.id}/profile-image`}
              alt=""
            /> */}
            <div
              className="image"
              style={{
                backgroundImage:
                  "url(" +
                  `${process.env.BACKEND_API}/api/users/${com.user.id}/profile-image` +
                  ")",
              }}
            ></div>
            <div className="container--values">
              <div className="data">
                <h3>{com.user.name}</h3>
                <p>{com.comment}</p>
              </div>
              <div className="date">
                <p>{FormatDate.calculateDate(com.createdAt)}</p>
              </div>
            </div>
          </CommentsContainer>
        ))}
      </MainContainer>
    </BodyStyled>
  );
}
