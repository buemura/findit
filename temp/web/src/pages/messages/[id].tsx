import React, { useState, useEffect } from "react";
import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import { GetServerSideProps } from "next";
import router from "next/router";
import { Authentication } from "../../api/authentication";
import api from "../../api/baseURL";
import {
  MainContainer,
  UserName,
  MessagesContainer,
  NewMessagesContainer,
} from "../../styles/pages/messages";
import { FormatDate } from "../../utils/formatDate";
import { Chats } from "../../api/chats";
import { Users } from "../../api/users";
import { IMessageData } from "../../config/interfaces";

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  const { id } = params;
  return {
    props: { id },
  };
};

export default function MessagesDetails({ id }) {
  const [myId, setMyId] = useState<string>("");
  const [state, setState] = useState({
    data: null,
    error: false,
    loading: true,
  });
  const [userID, setUserID] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [messages, setMessages] = useState<Array<IMessageData>>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    const token: string = localStorage.getItem("token");
    const authenticatedID: string = Authentication.checkUserSession("");
    setMyId(authenticatedID);
    getUserName();

    const intervalId = setInterval(() => {
      setState((state) => ({ data: state.data, error: false, loading: true }));
      api
        .get(`/api/chats/messages/${id}`, {
          headers: {
            authorization: token,
          },
        })
        .then(({ data }) => {
          setMessages(data);
        })
        .then((newData) =>
          setState({ data: newData, error: false, loading: false })
        )
        .catch(function (error) {
          console.log(error);
          setState({ data: null, error: true, loading: false });
        });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [state]);

  async function getUserName(): Promise<void> {
    const token: string = localStorage.getItem("token");
    const data = await Chats.getChatByID(id, token);
    const userId = data.sender_id === myId ? data.receiver_id : data.sender_id;

    setUserID(userId);

    const user = await Users.getUserByID(userId);
    setUserName(user.name);
  }

  async function sendMessage(): Promise<void> {
    if (newMessage.replaceAll(" ", "") !== "") {
      const token: string = localStorage.getItem("token");
      await Chats.sendMessage(id, myId, newMessage, token);
      setNewMessage("");
    } else {
      setNewMessage("");
      console.log("Blank message to send!");
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed!");
      sendMessage();
      handleLastMessage();
    }
  };

  const handleLastMessage = () => {
    var heightPage = document.body.scrollHeight;
    window.scrollTo(0, heightPage);
  };

  function redirectToUserProfile(userId: string): void {
    if (myId === userId) {
      router.push("/profile");
      return;
    }
    router.push(`/profile/${userId}`);
  }

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <UserName onClick={() => redirectToUserProfile(userID)}>
          <div
            style={{
              backgroundImage: `url(${process.env.BACKEND_API}/api/users/${userID}/profile-image)`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              width: "3rem",
              height: "3rem",
              borderRadius: "100%",
              marginRight: "1rem",
            }}
          ></div>
          <p>{userName}</p>
        </UserName>
        <MessagesContainer>
          {messages.map((message) =>
            myId === message.sender_id ? (
              <div key={message.id} className="iam-sender">
                <p className="message">{message.content}</p>
                <p className="message-date">
                  {FormatDate.calculateDate(message.created_at)}
                </p>
              </div>
            ) : (
              <div key={message.id} className="iamnot-sender">
                <p className="message">{message.content}</p>
                <p className="message-date">
                  {FormatDate.calculateDate(message.created_at)}
                </p>
              </div>
            )
          )}
        </MessagesContainer>
        <NewMessagesContainer>
          <input
            className="message-input"
            id="message-input"
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="send-button"
            id="send-button"
            onClick={sendMessage}
          >
            Send
          </button>
        </NewMessagesContainer>
      </MainContainer>
    </BodyStyled>
  );
}
