import { Container, Header } from "../styles/components/HeaderUser";
import Switch from "./Switch";

import Link from "next/link";
import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { Authentication } from "../api/authentication";
import { Users } from "../api/users";

export function HeaderUser() {
  const [hasNotification, setHasNotification] = useState<number>(0);
  const [hasSelected, setHasSelected] = useState<boolean>(false);
  const [profilePhoto, setProfilePhoto] = useState<string>("");

  useEffect(() => {
    (async () => {
      const id: string = Authentication.checkUserSession("");
      const data = await Users.getUserProfilePhoto(id);

      if (
        data != null &&
        (data.hasPhoto === false || data.hasPhoto !== undefined)
      ) {
        setProfilePhoto("/icons/user-icon.png");
        return;
      }
      setProfilePhoto(
        `${process.env.BACKEND_API}/api/users/${id}/profile-image`
      );
    })();
  }, []);

  return (
    <Container>
      <Header>
        <div className="divLogo">
          <Link href="/home" passHref>
            <a className="notranslate">
              <img src="/icons/logo.png" alt="Logo" />
              Find It
            </a>
          </Link>
        </div>

        <div className="containerLinks">
          <div className="search">
            <img src="/icons/search.png" alt="Search" />
            <input type="text" placeholder="Type here..." />
            <button>Search</button>
          </div>

          <div className="menuItems">
            <div className="pageLinks">
              <Link href="/home" passHref>
                <a>Home</a>
              </Link>
              <Link href="/about" passHref>
                <a>About</a>
              </Link>
              <Link href="/contact" passHref>
                <a>Contact</a>
              </Link>
            </div>
            <div className="profileLinks">
              <Link href="/messages" passHref>
                <a className="notification">
                  <span>Messages</span>
                  <div>
                    <img
                      className="chatImage"
                      src="/icons/chat.png"
                      alt="Chat"
                    />
                    {hasNotification === 1 ? (
                      <img
                        className="warning"
                        src="/icons/warning.png"
                        alt="Warning"
                      />
                    ) : (
                      <span className="warningSpan"></span>
                    )}
                  </div>
                </a>
              </Link>

              <div
                className="profile"
                onClick={() => {
                  setHasSelected(!hasSelected);
                  console.log(hasSelected);
                }}
                style={{
                  backgroundImage: `url(${profilePhoto})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  height: "3rem",
                  width: "3rem",
                  borderRadius: "100%",
                }}
              ></div>
              <CSSTransition
                in={hasSelected === true}
                timeout={10}
                unmountOnExit
              >
                <div className="menu-open">
                  <ul>
                    <a href="/profile">
                      <li>Profile</li>
                    </a>
                    <a href="/posts/my-posts">
                      <li>Services</li>
                    </a>
                    <a href="/posts/my-favorites">
                      <li>Favorites</li>
                    </a>
                    <a href="" onClick={Authentication.logOut}>
                      <li>Logout</li>
                    </a>
                  </ul>
                </div>
              </CSSTransition>
            </div>
          </div>

          <Switch className="menu" id="switchButton"></Switch>
        </div>
      </Header>
    </Container>
  );
}
