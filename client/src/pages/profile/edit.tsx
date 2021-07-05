import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";

import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import {
  MainContainer,
  MainSection,
  PersonalInfo,
  AboutMe,
  Portfolio,
} from "../../styles/pages/profile";

export default function Profile() {
  const router = useRouter();

  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [occupation, setOccupation] = useState("");
  const [about_me, setAboutMe] = useState("");
  const [user_photo, setUserPhoto] = useState("");

  /**
   * JWT token is needed in order to make a POST, PUT or DELETE request.
   * Also this token expires in 1 hour. So you will need to Sign in again to generate a new one.
   * The token is associated with the user that Signed in.
   * So if we decode this token we will be able to retrieve user ID and Email.
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

  // Update profile by sending a PUT request do backend API.
  const updateProfile = () => {
    checkUserSession();
    axios
      .put(
        `${process.env.BACKEND_API}/api/users/${id}`,
        {
          name,
          email,
          city,
          state,
          country,
          phone,
          occupation,
          about_me,
          user_photo,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((res) => {
        router.push("/profile");
      })
      .catch((err) => {
        alert("Failed to Update user!");
      });
  };

  useEffect(() => {
    checkUserSession();
    setHasPhoto(false);
    axios
      .get(`${process.env.BACKEND_API}/api/users/${id}`)
      .then(({ data }) => {
        setName(data.name);
        setEmail(data.email);
        setCity(data.city);
        setState(data.state);
        setCountry(data.country);
        setPhone(data.phone);
        setOccupation(data.occupation);
        setAboutMe(data.about_me);
        setUserPhoto(data.user_photo);

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
              <img src={user_photo} alt="photo" className="user-photo" />
            ) : (
              <img
                src="../icons/user-icon.png"
                alt="photo"
                className="user-photo"
              />
            )}
          </div>

          <div className="title">
            <h3>
              <input
                type="text"
                placeholder={name}
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
            </h3>

            <h3>
              <input
                type="text"
                placeholder={occupation}
                defaultValue={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              />
            </h3>

            <button onClick={updateProfile}>Save Profile</button>
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
                <strong>Local:</strong>
                <input
                  type="text"
                  placeholder={city}
                  defaultValue={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <input
                  type="text"
                  placeholder={state}
                  defaultValue={state}
                  onChange={(e) => setState(e.target.value)}
                />
                <input
                  type="text"
                  placeholder={country}
                  defaultValue={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </p>
              <p>
                <strong>Phone:</strong>
                <input
                  type="text"
                  placeholder={phone}
                  defaultValue={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </p>
              <p>
                <strong>Email:</strong> {email}
              </p>
            </div>
          </PersonalInfo>

          <AboutMe>
            <h2>About me</h2>
            <input
              type="text"
              placeholder={about_me}
              defaultValue={about_me}
              onChange={(e) => setAboutMe(e.target.value)}
            />
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
