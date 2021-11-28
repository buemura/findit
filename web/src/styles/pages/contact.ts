import styled from "styled-components";

// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"></link>

export const ImageContainer = styled.div`
  * {
    font-family: "Roboto", sans-serif;
  }
  
  min-height: calc(100vh - 60px);
  margin-top: 60px;
  padding: 0;
  width: 100%;
  background: #fff;
  @media (max-width: 1000px) {
    width: 100%;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
  @media (max-width: 650px) {
    margin-top: 100px;
    width: 100%;
    padding: 0px 0px 30px 0px;
  }
`;

export const Div = styled.div`
  padding: 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  .container-image {
    width: 100%;
    margin-bottom: 15px;
    div {
      width: 100%;
      height: 5rem;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
    @media (max-width: 650px) {
      margin-bottom: 15px;
    }
  }
  .container {
    display: flex;
    flex-direction: row;
    padding: 0 40px 40px 40px;
    form {
      width: 65%;
      padding: 0 25px 0 0;
      border-right: 1px solid #c4c4c4;
      h1 {
        width: 100%;
        margin-bottom: 35px;
      }
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
        .icone-message {
          position: absolute;
          left: 10px;
          top: 10px;
          z-index: 1;
        }
        .message {
          height: 100px;
          width: 100%;
          border-radius: 15px;
          outline: none;
          border: none;
          background: #eee;
          padding: 10px 20px 0 45px;
          position: relative;
          border-bottom: 3px solid transparent;
          &:hover {
            border-bottom: 3px solid #4169e1;
          }
        }
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
        margin-top: 25px;
        transition: 0.2s;
        &:hover {
          background: #f7226a;
          letter-spacing: 1px;
        }
      }
    }
    .media-and-location-container {
      width: 30%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding-left: 25px;
      .media-container {
        a {
          img {
            width: 25px;
            height: 25px;
            margin: 5px 10px;
          }
        }
      }
    }
    @media (max-width: 650px) {
      flex-direction: column;
      width: 100%;
      justify-content: center;
      align-items: center;
      padding: 0 15px 40px 15px;

      form {
        border: none;
        padding: 0;
        width: 100%;
      }

      .media-and-location-container {
        width: 100%;
        padding: 0;
        margin-top: 40px;
      }
    }
  }
`;
