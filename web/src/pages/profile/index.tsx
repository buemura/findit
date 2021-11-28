import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Authentication } from "../../api/authentication";
import { Users } from "../../api/users";
import { Portfolios } from "../../api/portfolio";

import { CSSTransition } from "react-transition-group";

import { HeaderPage } from "../../components/HeaderPage";
import { BodyStyled } from "../../styles/components/middleSection";
import {
  MainContainer,
  MainSection,
  PersonalInfo,
  AboutMe,
  Portfolio,
} from "../../styles/pages/profile";
import { IUserData } from "../../config/interfaces";

export default function Profile() {
  const [myId, setMyId] = useState<string>("");
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const [user, setUser] = useState<IUserData>({
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
  const [workdDone, setWorkdDone] = useState(0);
  const [portfolios, setPortfolios] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [imageId, setImageId] = useState("");

  const hasNoPhoto = "/icons/user-icon.png";

  const divStyleHasPhoto = {
    backgroundImage: "url(" + profilePhoto + ")",
  };

  const divStyleHasNoPhoto = {
    backgroundImage: "url(" + hasNoPhoto + ")",
  };

  useEffect(() => {
    (async () => {
      const id: string = Authentication.checkUserSession("");
      const data = await Users.getUserByID(id);
      const completedServices = await Users.getUserCompletedServices(id);
      const portfolioImages = await Portfolios.getUserPortfolios(id);

      setMyId(id);
      setHasPhoto(false);
      setUser(data);
      setWorkdDone(completedServices);

      if (portfolioImages.length > 0) {
        setPortfolios(portfolioImages);
      }

      if (data.user_photo) {
        setHasPhoto(true);
        setProfilePhoto(
          `${process.env.BACKEND_API}/api/users/${id}/profile-image`
        );
      }
    })();
  }, []);

  const setImageDescription = (alt) => {
    var my_p = document.getElementById(
      "image-description"
    ) as HTMLParagraphElement;
    return (my_p.innerHTML = alt);
  };

  const cleanImageDescription = (alt) => {
    var my_p = document.getElementById(
      "image-description"
    ) as HTMLParagraphElement;
    return (my_p.innerHTML = "");
  };

  return (
    <BodyStyled>
      <HeaderPage />
      <MainContainer>
        <MainSection>
          <div className="profile-photos">
            {hasPhoto ? (
              <div className="user-photo" style={divStyleHasPhoto}></div>
            ) : (
              <div className="user-photo" style={divStyleHasNoPhoto}></div>
            )}
            <div className="title">
              <h1>{user.name}</h1>
              <h3>{user.occupation}</h3>
              <Link href="/profile/edit">
                <a href="">
                  <img src="icons/edit-property-64.png"></img>Edit Profile
                </a>
              </Link>
            </div>
          </div>
          
          <PersonalInfo>
            <div>
              <p>
                <strong>Works Done: </strong>
                {workdDone}
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
            <div className="horizontal-bar">
              {portfolios.map((portfolio) => (
                <div key={portfolio.id} className="portfolio-container">
                  <div
                    className="portfolio-image"
                    style={{
                      backgroundImage: `url(${process.env.BACKEND_API}/api/users/${myId}/portfolios-image/${portfolio.id})`,
                    }}
                  ></div>
                  <p
                    className="image-description"
                    onClick={() => {
                      setShowMore(true);
                      setImageId(portfolio.id);
                      console.log(showMore);
                    }}
                  >
                    {
                      "Clique para ver mais!"
                      //`${process.env.BACKEND_API}/api/users/${myId}/portfolios-image/${portfolio.id}`
                    }
                  </p>

                  <CSSTransition
                    in={showMore === true && portfolio.id === imageId}
                    timeout={10}
                    unmountOnExit
                  >
                    <div className={`show-more ${portfolio.id}`}>
                      <p
                        className="close-btn"
                        onClick={() => {
                          setShowMore(false);
                          setImageId("");
                        }}
                      >
                        X
                      </p>
                      <div
                        className="show-portfolio-image"
                        style={{
                          backgroundImage: `url(${process.env.BACKEND_API}/api/users/${myId}/portfolios-image/${portfolio.id})`,
                        }}
                      ></div>
                      <p className="show-image-description">
                        {
                          `${process.env.BACKEND_API}/api/users/${myId}/portfolios-image/${portfolio.id}`
                          // ${portfolio.photoDescription}
                        }
                      </p>
                    </div>
                  </CSSTransition>
                </div>
              ))}
            </div>
          </Portfolio>
        </MainSection>
      </MainContainer>
    </BodyStyled>
  );
}
