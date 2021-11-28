import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 60px 0 0 0;
  padding: 0 0 60px 0;
  width: 100%;
  min-height: calc(100vh - 60px);
  overflow-x: hidden;
  background-color: #f0f0f0;

  .h1-page {
    margin-top: 0 !important;
    padding: 2rem 2rem 1rem 2rem;
    background: #ffffff;

    h1 {
      margin: 0;
    }

    .change--view {
      position: relative;
      margin-top: 1rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 11rem;

      .options {
        position: relative;
        font-size: 1rem;
        margin: .3rem 0;
        padding: 0 1.3rem;
        width: fit-content;
        text-align: center;
        background: transparent;
        outline: none;
        border: none;
        cursor: pointer;
        transition: .2s;
        user-select: none;

        &:hover {
          transform: translateY(15%);
        }
        &::after {
          content: "";
          position: absolute;
          height: 3px;
          width: 0;
          top: 0%;
          left: 50%;
          transition: .2s;
        }
        &:hover::after {
          content: "";
          position: absolute;
          height: 3px;
          width: 100%;
          top: -35%;
          left: 0;
          background: #4169E1;
          transform: translateY(-95%);
        }
        &::before {
          content: "";
          position: absolute;
          height: 100%;
          width: 0;
          top: 0;
          left: 50%;
          transition: .2s;
        }
        &:hover::before {
          content: "";
          position: absolute;
          height: 150%;
          width: 100%;
          top: 0;
          left: 0;
          background: linear-gradient(rgba(210, 210, 210, .5), rgba(240, 240, 240, .3), rgba(240, 240, 240, .2), rgba(240, 240, 240, .1));
          transform: translateY(-25%);
          z-index: -99;
        }     
      }
      
      .options.checked {
        &::after {
          content: "";
          position: absolute;
          height: 3px;
          width: 100%;
          top: -35%;
          left: 0;
          background: #4169E1;
        }
      }
    }
  }

  @media (max-width: 650px) {
    flex-direction: column;
    padding-top: 0;

    .h1-page {
      margin-top: 0 !important;
      padding: 5rem 2rem 1rem 2rem;
      background: #ffffff;
    }
    h1 {
      text-align: center;
    }
    .change--view {
      width: 100% !important;
      .options {
        width: 5rem !important;
      }
    }
  }
`;

export const ContainerFilters = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  width: calc(100% - 15rem);
  margin-top: 0.8rem;

  @media (max-width: 650px) {
    width: 100%;
  }
`;

export const Filters = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  background: #fff;
  display: flex;
  /* flex-direction: row; */
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 15rem;
  margin: 0;
  padding: 1.8rem 0.6rem;

  input {
    margin: 0.1rem 0;
    padding: 0 0 0 0.8rem;
    width: 100%;

    border: 0.2px solid #b8b8b8;
    border-radius: 5px;

    height: 30px;

    &:focus {
      border: 1px solid #4169e1;
    }
  }

  button {
    margin: 0.8rem 0;
    background-color: #4169e1;
    color: #fff;
    font-weight: bold;

    border: none;
    border-radius: 5px;

    height: 30px;
    width: 100%;

    &:hover {
      cursor: pointer;
      background-color: #f7226a;
      color: #fff;
      font-weight: bold;
    }
  }

  @media (max-width: 650px) {
    //margin-top: calc(30px);
    flex-direction: column;
    width: 96%;
    margin: 0 2% 3rem 2%;
    height: fit-content;
    position: relative;
  }
`;

export const Feed = styled.div`
  display: flex;
  align-items: center;
  width: 96%;
  margin: 0.3rem 2% 0 2%;
  padding: 0.6rem 2rem;
  background-color: #ffffff;
  border-radius: 3px;
  position: relative;

  .category-image {
    height: 3.5rem;
    width: 3.5rem;
    filter: grayscale(1);
    -webkit-filter: grayscale(1) opacity(0.4);
    transition: 0.3s;
  }

  .category-container {
    margin-left: 1.3rem;
    margin-right: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    flex: 1;

    h2 {
      font-size: 1.8rem;
      margin: 0.8rem 0;
    }

    div {
      display: flex;
      justify-content: flex-end;
      flex-direction: row;
      width: 100%;

      * {
        margin: 0;
        padding: 0;
      }

      .div-city {
        width: 180%;
        margin-right: 1rem;
      }

      .div-date {
        width: fit-content;
        min-width: 6rem;
        margin-left: 1rem;
      }

      div {
        display: flex;
        flex-direction: column;
      }

      p,
      h3 {
        margin: 0.3rem 0;
      }

      .buttons {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        width: 5rem;
        height: auto;
        padding: 1rem 1rem 1rem 0;
        margin: 0;

        button {
          width: 100%;
          height: fit-content;
          margin: 0.3rem 0;
          /* font-size: .7rem; */
          padding: 0.3rem 0 0.3rem 0;
          font-size: 0px;
          text-align: right;
          background: transparent;
          outline: none;
          border: none;
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          justify-content: right;
          cursor: pointer;
          transition: 0.3s;

          .div-icon-show,
          .div-icon-edit,
          .div-icon-remove {
            transition: 0.3s;
            width: 1rem;
            height: 1rem;
            margin-left: 0.3rem;
            filter: gray;
            filter: grayscale(1);
            -webkit-filter: grayscale(1) opacity(0.4);
          }
        }
      }
    }

    div:last-child {
      align-items: flex-end;
    }
  }

  &:hover {
    background: #f8f8f8;

    .category-image {
      filter: grayscale(0%);
      -webkit-filter: grayscale(0%) opacity(1) !important;
    }

    .buttons {
      button {
        font-size: 0.7rem !important;
      }

      .div-icon-show,
      .div-icon-edit,
      .div-icon-remove {
        width: 1rem;
        height: 1rem;
        margin-left: 0.3rem;
        filter: grayscale(0%);
        -webkit-filter: grayscale(0%) opacity(1) !important;
      }
    }
  }

  @media (max-width: 500px) {
    .category-image {
      display: none;
    }
  }
  @media (max-width: 960px) {
    .category-container {
      div {
        flex-direction: column;
        align-items: flex-start;

        .div-city {
          width: 100%;
          margin-right: 0;
        }

        .div-date {
          width: 100%;
          margin-left: 0;
        }
      }
    }
  }
`;

export const Post = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 70%;
  margin: 30px 0 0 0;
  padding: 10px 20px 10px 20px;
  background-color: #ffffff;

  div {
    * {
      margin: 0;
      padding: 0;
    }

    h2 {
      font-size: 1.8rem;
      margin: 1rem 0;
    }

    p,
    h3 {
      margin: 0.3rem 0;
    }
  }

  &:hover {
    cursor: default;
  }

  @media (max-width: 900px) {
    width: 95%;
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 200px 0 0 0;
`;

export const PostComments = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 70%;
  margin: 15px 0 15px 0;
  padding: 10px 20px 10px 20px;
  background-color: #ffffff;
  font-size: large;

  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;

    input {
      margin: 10px 0 10px 0;

      border: 0.2px solid #b8b8b8;
      border-radius: 5px;

      height: 30px;
      width: 80%;

      &:focus {
        border: 1px solid #4169e1;
      }
    }

    &:hover {
      cursor: pointer;
    }

    button {
      margin: 0 0 0 10px;
      background-color: #4169e1;
      color: #ffffff;

      border: none;
      border-radius: 5px;

      height: 30px;
      flex: 1;

      &:hover {
        cursor: pointer;
        background-color: #0300a3;
        color: #ffffff;
      }
    }
  }

  @media (max-width: 900px) {
    width: 95%;
  }
`;

export const CommentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  width: 70%;
  margin: 1px 0 0 0;
  padding: 10px 20px 10px 20px;
  background-color: #ffffff;

  .image {
    margin: 0 40px 0 0;
    border-radius: 30%;

    width: 70px;
    height: 70px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .container--values {
    display: flex;
    justify-content: space-between;
    flex: 1;

    .date {
      display: flex;
      align-items: flex-end;

      p {
        margin: 0 0.5rem 1rem 0;
      }
    }
  }

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 900px) {
    width: 95%;
  }
`;
