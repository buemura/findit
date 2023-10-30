import styled from "styled-components";

export const Div = styled.div`
  * {
    font-family: "Roboto", sans-serif;
  }

  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .form-container-login {
    background: #fff;
    width: 500px;
    height: 400px;
    border-radius: 25px;
    padding: 30px 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    z-index: 1000;
    .name-label {
      text-transform: uppercase;
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 2px;
      position: absolute;
      transform: translateY(-20px);
      background: #4169e1;
      color: #fff;
      padding: 5px 20px;
      border-radius: 0 25px 0 25px;
      top: 0;
    }
    form {
      width: 100%;
      div {
        position: relative;
        display: flex;
        width: 100%;
        align-items: center;
        margin-top: 5px;
        .icone {
          position: absolute;
          left: 10px;
          z-index: 1;
        }
        input {
          width: 100%;
          height: 40px;
          border-radius: 15px;
          outline: none;
          border: none;
          background: #eee;
          padding: 0 20px 0 45px;
          position: relative;
          border-bottom: 3px solid transparent;
          &:hover {
            border-bottom: 3px solid #4169e1;
          }
        }
      }
      .checkbox-label,
      .checkbox-label-terms {
        margin-top: 3px;
        margin-left: 25px;
        display: block;
        input {
          margin-right: 7px;
        }
      }
      .checkbox-label {
        margin-top: 25px;
      }
      button {
        width: 100%;
        height: 40px;
        border-radius: 15px;
        outline: none;
        border: none;
        background: #4169e1;
        color: #fff;
        font-weight: bold;
        padding: 0;
        margin-top: 30px;
        margin-bottom: 25px;
        transition: 0.2s;
        font-size: 20px;
        letter-spacing: 1px;
        &:hover {
          background: #f7226a;
          letter-spacing: 2px;
          cursor: pointer;
        }
      }
    }
    .image-login {
      position: absolute;
      left: -80%;
      z-index: -1;
      img {
        width: 500px;
      }
    }
  }
  .register-div {
    width: 300px;
    height: 450px;
    background: #4169e1;
    position: absolute;
    transform: translateX(350px);
    border-radius: 25px;
    transition: 0.4s;
    color: #fff;
    padding: 80px 65px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    span {
      text-align: center;
    }
    a {
      border-radius: 10px;
      outline: none;
      padding: 3px 25px;
      border: none;
      background: #f7226a;
      font-weight: bold;
      color: #fff;
      transition: 0.2s;
      text-decoration: none;
      &:hover {
        background: #e21459;
      }
    }
  }

  @media (max-width: 1000px) {
    flex-direction: column-reverse;
    .image-login {
      display: none;
    }
    .image-register {
      display: none;
    }
    .register-div {
      position: relative;
      transform: translateX(0);
      height: auto;
      width: 500px;
      padding: 15px 20px;
      border-radius: 0 0 25px 25px;
      transform: translateY(30px);
      span,
      h2 {
        display: none;
      }
    }
    .login-div {
      position: relative;
      transform: translateX(0);
      height: auto;
      width: 500px;
      padding: 15px 20px;
      border-radius: 0 0 25px 25px;
      transform: translateY(30px);
      span {
        display: none;
      }
    }

    .form-container-login {
      border-radius: 25px 25px 0 0;
      transform: translateY(30px);
    }
  }

  @media (max-width: 650px) {
    height: 100%;
    background: #000;
    padding-top: 0;
    margin-top: 0;
    position: absolute;

    .register-div {
      position: fixed;
      bottom: 25px;
      transform: translateX(0);
      width: 100%;
      height: 8%;
      padding: 15px 20px;
      border-radius: 0;
      transform: translateY(30px);
      flex: 1;
      z-index: 10000;
      span,
      h2 {
        display: none;
      }
    }

    .form-container-login {
      height: auto;
      border-radius: 0;
      width: 100%;
      transform: translateY(30px);
      flex: 1;
      padding: 30px 15px;
      .name-label {
        position: relative;
        transform: translateY(0);
        margin-bottom: 35px;
      }
    }
  }
`;
