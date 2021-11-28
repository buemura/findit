import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  margin: 60px 0 0 0;
  padding: 0 0 60px 0;
  width: 100%;
  min-height: calc(100vh - 60px);
  overflow-x: hidden;
  background-color: #f0f0f0;
  
  @media (max-width: 650px) {
    flex-direction: column;
    padding-top: 0;
  }
`;

export const ContainerFilters = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: calc(100% - 15rem);
  margin-top: .8rem;
  
  @media (max-width: 650px) {
    width: 100%;
  }
`

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

  input, select {
    margin: 0.1rem 0;
    padding: 0 0 0 0.8rem;
    width: 100%;
    font-size: 13px;

    outline: none;

    border: 0.2px solid #b8b8b8;
    border-radius: 5px;

    height: 30px;

    &:focus {
      border: 1px solid #4169e1;
    }
  }

  .div-select {
    position: relative;
    width: 100%;
  }

  .show {
    user-select: none;
    font-size: 13px;
    position: absolute;
    top: 50%;
    left: 6%;
    transform: translateY(-50%);
    color: #797575;
  }

  .not-show {
    display: none;
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
      background-color: #F7226A;
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

  .category-image {
    height: 3.5rem;
    width: 3.5rem;
    filter: gray;
    filter: grayscale(1);
    -webkit-filter: grayscale(1) opacity(0.4);
    transition: .2s;
  }

  .category-container {
    margin-left: 1.3rem;
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
        margin-right: 30px;
      }

      .div-date {
        width: fit-content;
        white-space: nowrap;
        margin-left: 30px;
        min-width: 80px;
        font-size: 13px;
      }

      div {
        display: flex;
        flex-direction: column;
      }

      p,
      h3 {
        margin: 0.3rem 0;
      }
    }

    div:last-child {
      align-items: flex-end;
    }
  }

  &:hover {
    cursor: pointer;
    background: #f8f8f8;
    
    .category-image {
      filter: grayscale(0%);
      -webkit-filter: grayscale(0%) opacity(1) !important;
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
