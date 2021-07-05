import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 60px 0 0 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
  background-color: #fff;
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
    background-image: url("https://101trading.co.uk/wp-content/uploads/2015/04/horizon_00364590-1030x412.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .user-photo {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 25px;
    transform: translateY(40%);
  }

  .title {
    padding: 40px 0 10px 0;
    width: 60%;
    border-bottom: 1px solid #aaa;
    position: relative;
  }

  .title a {
    position: absolute;
    right: 0;
    top: 0;
    transform: translateY(10px);
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    text-decoration: none;
    color: #4169e1;
    font-size: 0.8rem;

    img {
      width: 0.8rem;
      margin-right: 10px;
    }
  }

  .title h1,
  .title h3 {
    text-align: center;
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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  border-bottom: 1px solid #aaa;
  div {
    margin: 0 10px 0 10px;
  }
`;

export const AboutMe = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  border-bottom: 1px solid #aaa;
  h2,
  p {
    margin: 15px;
  }
  input {
    width: 80%;
    height: 100px;
  }
`;

export const Portfolio = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  border-bottom: 1px solid #aaa;
  padding-bottom: 20px;
  margin-bottom: 30px;
  h2 {
    margin: 15px;
  }
  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0 10px 0 10px;

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
  }
`;
