import React, { useState } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

import authentication from "../services/authentication";

import { Container } from "../styles/components/loginContainer";
import { Div } from "../styles/pages/loginPage";

import { Envelope, Lock, Person } from "react-bootstrap-icons";

import { HeaderPage } from "../components/HeaderPage";
import { BodyStyled } from "../styles/components/middleSection";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const clearVariables = () => {
    setEmail("");
    setPassword("");
  };

  const authenticationSucceeded = (token) => {
    localStorage.setItem("token", token);
    router.push("/home");
  };

  const authenticationFailed = () => {
    alert("Falha de autenticação! Verifique as informações preenchidas.");
    clearVariables();
    router.push("/login");
  };

  const incompleteFields = () => {
    alert("Favor preencher todos os campos!");
    clearVariables();
    router.push("/login");
  };

  const login = async () => {
    if (email === "" || password === "") {
      incompleteFields();
      return;
    }

    try {
      const token = await authentication.autheticate({
        email,
        password,
      });
      if (token) {
        authenticationSucceeded(token);
      } else {
        authenticationFailed();
      }
    } catch (err) {
      authenticationFailed();
    }
  };

  return (
    <BodyStyled>
      <HeaderPage />
      <Container>
        <Div>
          {/* this div redirect to register account page */}
          <div className="register-div">
            <span>
              Don't have account, register and make your life better. It's free!
            </span>
            <h2>Find It</h2>
            <Link href="/register">
              <a>Register Now</a>
            </Link>
          </div>
          {/* this div is used to login */}
          <div className="form-container-login">
            <div className="image-login">
              <img src={"svg/unlock.svg"} alt="Background" />
            </div>
            <span className="name-label">Login</span>
            <form id="login-form" onSubmit={handleSubmit}>
              <div>
                <Envelope size={25} className="icone" />
                <input
                  type="email"
                  id="login-email"
                  placeholder="Email - ex: you@email.com"
                  defaultValue={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <Lock size={25} className="icone" />
                <input
                  type="password"
                  id="login-password"
                  placeholder="Password"
                  defaultValue={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></input>
              </div>
              <label className="checkbox-label">
                <input type="checkbox"></input>
                remember password?
              </label>

              <button
                type="submit"
                form="login-form"
                value="Submit"
                onClick={login}
              >
                Continue
              </button>
            </form>
            <p>
              Forgot your password? <a href="/">Click here!</a>
            </p>
          </div>
        </Div>
      </Container>
    </BodyStyled>
  );
}
