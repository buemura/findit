import { Container, Header } from "../styles/components/HeaderDefault";
import Switch from "./Switch";

import Link from "next/link";

export function HeaderDefault() {
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

            <div className="loginLinks">
              <Link href="/login" passHref>
                <a className="login">Login</a>
              </Link>
              <Link href="/register" passHref>
                <a className="register">Register</a>
              </Link>
            </div>
          </div>

          <Switch className="menu" id="switchButton"></Switch>
        </div>
      </Header>
    </Container>
  );
}
