import axios from "axios";
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import Link from "next/link";

import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import {
  MainContainer,
  MainSection,
  PersonalInfo,
  AboutMe,
  Portfolio,
} from "../../styles/pages/profile";

interface IUser {
  name: string;
  email: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  occupation: string;
  about_me: string;
  user_photo: string;
}

export default function Profile() {
  const router = useRouter();
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    occupation: "",
    about_me: "",
    user_photo: "",
  });

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

  useEffect(() => {
    checkUserSession();
    setHasPhoto(false);
    axios
      .get(`${process.env.BACKEND_API}/api/users/${id}`)
      .then(({ data }) => {
        setUser(data);
        if (data.user_photo) {
          setHasPhoto(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <MainSection>
          <div className="profile-photos">
            {hasPhoto ? (
              <img src={user.user_photo} alt="photo" className="user-photo" />
            ) : (
              <img
                src="icons/user-icon.png"
                alt="photo"
                className="user-photo"
              />
            )}
          </div>

          <div className="title">
            <h1>{user.name}</h1>
            <h3>{user.occupation}</h3>
            <Link href="/profile/edit">
              <a href="">
                <img src="icons/edit-property-64.png"></img>Edit Profile
              </a>
            </Link>
          </div>

          <PersonalInfo>
            <div>
              <p>
                <strong>Works Done:</strong>{" "}
              </p>
              <p>
                <strong>Works Done in Time:</strong>{" "}
              </p>
              <p>
                <strong>Works Done Within Budget:</strong>{" "}
              </p>
            </div>
            <div>
              <p>
                <strong>Local:</strong> {user.city}, {user.state} -{" "}
                {user.country}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          </PersonalInfo>

          <AboutMe>
            <h2>About me</h2>
            <p>{user.about_me}</p>
          </AboutMe>

          <Portfolio>
            <h2>Portfolio</h2>
            <div>
              <div className="div-img-portifolio d01"></div>
              <div className="div-img-portifolio d02"></div>
            </div>
          </Portfolio>
        </MainSection>
      </MainContainer>
    </BodyStyled>
  );
}
