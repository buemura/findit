import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 60px 0 0 0;
  padding: 0;
  width: 100%;
  min-height: calc(100vh - 60px);
  overflow-x: hidden;
  background-color: #fff;
  
  @media (max-width: 650px) {    
    margin: 100px 0 0 0;
  }
`;

export const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 0 0 0;
  width: 100%;

  .profile-photos {
    width: 100%;
    background-image: url("https://www.icolorpalette.com/download/solidcolorimage/28282d_solid_color_background_icolorpalette.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .user-photo {
    width: 16rem;
    height: 16rem;
    border-radius: 50%;
    margin: 25px;
    transform: translateY(0%);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    
    @media (max-width: 650px) {   
    width: 8rem;
    height: 8rem;
    }
  }

  .photo-black-transparence {
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: none;

    a {
      color: #eee;
      text-decoration: none;
      font-size: 0.8rem;
    }
  }
  .user-photo:hover .photo-black-transparence {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title {
    padding: 40px 0 10px 0;
    color: #eee;

    button {
      background: #4169E1;
      color: #fff;
      padding: .7rem 2rem;
      margin-top: 1rem;
      outline: none;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: .2s;

      &:hover {
        background: #2e56d1;
      }
    }
  }

  .title a {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translateY(10px);
    padding: 1rem;
    text-decoration: none;
    color: #eee;
    font-size: 0.8rem;

    img {
      width: 0.8rem;
      margin-right: 10px;
    }
  }

  .title h1,
  .title h3 {
    text-align: left;
    margin: 7px 0;
  }

  .title h1 {
    font-size: 2rem;
  }

  .title h3 {
    font-size: 1.2rem;
    font-weight: normal;
  }
`;

export const PersonalInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  border-bottom: 1px solid #aaa;
  div {
    margin: 0 10px 0 10px;
    width: 100%;

    * {
      width: 100%;
      text-align: center;
    }
  }

  @media (max-width: 650px) {   
    width: 100%;
  }
`;

export const AboutMe = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 85%;
  border-bottom: 1px solid #aaa;
  h2,
  p {
    margin: 15px;
  }
  input {
    width: 80%;
    height: 100px;
  }

  @media (max-width: 650px) {   
    width: 100%;
  }
`;

export const Portfolio = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 85%;
  border-bottom: 1px solid #aaa;
  padding-bottom: 20px;
  margin-bottom: 80px;
  

  h2 {
    margin: 15px;
  }
  
  .horizontal-bar {
    max-width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    overflow-x: auto;
    
    ::-webkit-scrollbar {
      width: 0;
      height: 10px;
      background: #f5f5f5;
    }
    ::-webkit-scrollbar-thumb {
      background: #c4c4c4;
      border-radius: 10px;
    }

    .portfolio-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: 0 10px 0 10px;
      position: relative;
      display: flex;
      flex-direction: column;


      .show-more {
        z-index: 9999999999;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        border: 1px solid #c4c4c4;
        padding: 4rem 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 70%;

        .close-btn {
          color: #fff;
          font-weight: bold;
          background: #ff0000;
          position: absolute;
          top: 0;
          right: 0;
          margin: .3rem;
          padding: 0;
          width: 2rem;
          height: 2rem;
          font-size: 1.6rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 2px;

        }

        .show-portfolio-image {
          width: 100%;
          height: 90%;
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
        }
        
        .show-image-description {
          align-items: center;
          margin-bottom: 0;
          font-size: 12px;
        }
      }

      .div-img-portifolio {
        height: 80px;
        width: 80px;
        background-position: center;
        background-size: cover;
      }

      .div-img-portifolio.d01 {
        background-image: url("assets/linux.jpg");
      }

      .div-img-portifolio.d02 {
        background-image: url("assets/unix.jpg");
      }

      .image-description {
        display: none;
        width: 95%;
        height: 95%;
        border-radius: 10px;
        margin: 5px;
        transition: .2s;
        position: absolute;
        text-align: center;
        background: rgba(35, 35, 41, .8);
        color: #fff;
      }

      .portfolio-image {
        height: 8rem;
        width: 8rem;
        border-radius: 10px;
        margin: 5px;
        transition: 0.2s;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;

        &:hover {
          cursor: pointer;
        }
      }

      &:hover .image-description {
        z-index: 9999999;
        display: flex;
        animation-name: anm1;
        animation-duration: .3s;
        animation-iteration-count: ease-out;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      @keyframes anm1 {
        0% {
        transform: scale(0) translateY(0%);
        }
        100% {
        transform: scale(1) translateY(0%);
        }
      }
    }  
  }

  @media (max-width: 650px) {   
    width: 100%;

    .horizontal-bar {
      width: 90%;
    }
  }
`;
