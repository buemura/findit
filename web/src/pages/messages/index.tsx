import router from "next/router";
import React, { useEffect, useState } from "react";
import { HeaderPage } from "../../components/HeaderPage";
import api from "../../api/baseURL";
import { Authentication } from "../../api/authentication";
import { BodyStyled } from "../../styles/components/middleSection";
import {
  MainContainer,
  ChatContainer,
  Title,
} from "../../styles/pages/messages";
import { IChatRoomsData } from "../../config/interfaces";

export default function Messages() {
  const [myId, setMyId] = useState<string>("");
  const [chatRoom, setChatRoom] = useState<Array<IChatRoomsData>>([]);

  useEffect(() => {
    const id: string = Authentication.checkUserSession("");
    const token: string = localStorage.getItem("token");
    setMyId(id);

    api
      .get(`/api/chats/chatsByUser/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then(({ data }) => {
        console.log(data);

        setChatRoom(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function lastMessage(chatId: string): string {
    const token: string = localStorage.getItem("token");
    let message: string = "Last Message";
    api
      .get(`/api/chats/messages/${chatId}`, {
        headers: {
          authorization: token,
        },
      })
      .then(({ data }) => {
        message = data[data.length - 1].content;
      })
      .catch((err) => {
        console.log(err);
      });

    return message;
  }

  function redirectToConversation(chatId: string): void {
    router.push(`/messages/${chatId}`);
  }

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        {chatRoom.length != 0 ? (
          chatRoom.map((chat) => (
            <ChatContainer
              key={chat.id}
              onClick={() => redirectToConversation(chat.id)}
            >
              <div
                style={{
                  backgroundImage: `url(${process.env.BACKEND_API}/api/users/${chat.userInfo.id}/profile-image)`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  width: "6rem",
                  height: "6rem",
                  borderRadius: "100%",
                  marginRight: "2rem",
                }}
              ></div>
              <div>
                <h2>{chat.userInfo.name}</h2>
                <p>{lastMessage(chat.id)}</p>
              </div>
            </ChatContainer>
          ))
        ) : (
          <Title>
            <h1>You have no message yet...</h1>
          </Title>
        )}
        <div></div>
      </MainContainer>
    </BodyStyled>
  );
}
