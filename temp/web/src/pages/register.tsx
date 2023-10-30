import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { Authentication } from "../api/authentication";

import { Container } from "../styles/components/registerContainer";
import { Div } from "../styles/pages/registerPage";

import { Envelope, Lock, Person } from "react-bootstrap-icons";

import { HeaderPage } from "../components/HeaderPage";
import { BodyStyled } from "../styles/components/middleSection";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleSubmit(event): void {
    event.preventDefault();
  }

  function registrationSucceeded(message: string): void {
    alert(
      `${message}\n\nA confirmation email was sent in your inbox.\nPlease confirm your Registration...`
    );
    router.push("/login");
  }

  function registrationFailed(message: string): void {
    alert(message);
    router.push("/register");
  }

  function incompleteFields(): void {
    alert("Favor preencher todos os campos!");
    router.push("/register");
    setName("");
    setEmail("");
    setPassword("");
  }

  async function register(): Promise<void> {
    if (name === "" || email === "" || password === "") {
      incompleteFields();
      return;
    }
    try {
      const { message } = await Authentication.register({
        name,
        email,
        password,
      });

      if (message) {
        registrationSucceeded(message);
      } else {
        registrationFailed("Registration Failed!");
      }
    } catch (err) {
      registrationFailed("Registration Failed");
    }
  }

  return (
    <BodyStyled>
      <HeaderPage />
      <Container>
        <Div>
          <div className="login-div">
            <span>Do you already have an accont? Log-in now!</span>
            <Link href="/login">
              <a>Login Now</a>
            </Link>
          </div>
          {/* Div for register form */}
          <div className="form-container-register">
            <div className="image-register">
              <img src={"svg/researching.svg"} alt="Background" />
            </div>
            <span className="name-label">Register</span>
            <form id="register-form" onSubmit={handleSubmit}>
              <div>
                <Person size={25} className="icone" />
                <input
                  type="text"
                  id="register-name"
                  placeholder="Full Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <Envelope size={25} className="icone" />
                <input
                  type="email"
                  id="register-email"
                  placeholder="Email - ex: you@email.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <Lock size={25} className="icone" />
                <input
                  type="password"
                  id="register-password"
                  placeholder="Password"
                ></input>
              </div>
              <div>
                <Lock size={25} className="icone" />
                <input
                  type="password"
                  id="register-password-retry"
                  placeholder="Retry password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></input>
              </div>
              <label className="checkbox-label">
                <input type="checkbox"></input>
                remember password?
              </label>
              <label className="checkbox-label-terms">
                <input type="checkbox"></input>I accept the Terms of Service?
              </label>
              <button
                type="submit"
                form="register-form"
                value="Submit"
                onClick={register}
              >
                Create Account
              </button>
            </form>
          </div>
        </Div>
      </Container>
    </BodyStyled>
  );
}
