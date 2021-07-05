import { Container, Header } from "../styles/components/HeaderDefault";
import Switch from "./Switch";

import Link from "next/link";
import { useEffect, useState } from "react";

export function HeaderDefault() {
  const [hasToken, setHasToken] = useState(false);
  const [hasNotification, setHasNotification] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setHasToken(true);
    }
  }, []);

  return (
    <Container>
      <Header>
        <div className="divLogo">
          <Link href="/home" passHref>
            <a>
              <img src="icons/logo.png" alt="Logo" />
              Find It
            </a>
          </Link>
        </div>

        <div className="containerLinks">
          <div className="search">
            <img src="icons/search.png" alt="Search" />
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

            <div className="loginLinks">
              {hasToken ? (
                <>
                  <div className="menuItems">
                    <div className="profileLinks">
                      <Link href="/notification" passHref>
                        <a className="notification">
                          <span>Notifications</span>
                          <div>
                            <img
                              className="notificationImage"
                              src="icons/notification-bell.png"
                              alt="Notification"
                            />
                            {hasNotification === 1 ? (
                              <img
                                className="warning"
                                src="icons/warning.png"
                                alt="Warning"
                              />
                            ) : (
                              <span className="warningSpan"></span>
                            )}
                          </div>
                        </a>
                      </Link>
                      <Link href="/profile" passHref>
                        <a className="profile">Profile</a>
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/login" passHref>
                    <a className="login">Login</a>
                  </Link>
                  <Link href="/register" passHref>
                    <a className="register">Register</a>
                  </Link>
                </>
              )}
            </div>
          </div>

          <Switch className="menu" id="switchButton"></Switch>
        </div>
      </Header>
    </Container>
  );
}
