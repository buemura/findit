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
`;

export const CategoryList = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 160px;
  padding: 15px;
  margin: 0;
  background-color: #fff;
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
  @media (max-width: 1250px) {
    justify-content: flex-start;
  }
  @media (max-width: 650px) {
    margin-top: 50px;
    justify-content: flex-start;
  }
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 15px 0px 15px;
  min-width: 90px;
  transition: 0.2s;
  padding: 0;

  word-wrap: break-word;
  list-style: none;
  color: #000;
  border-radius: 10px;
  p {
    text-align: center;
    margin: 0;
  }
  &:hover {
    cursor: pointer;
    transform: scale(1.08);
  }
  @media (max-width: 650px) {
    img {
      height: 40px;
    }
  }
`;

export const MainSection = styled.div`
  width: 100%;
  height: 100%;
  height: calc(100vh - 60px - 160px - 1px);
  background: #fff;
  margin-top: 1px;
  padding: 40px 30px 30px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  .main-texts p {
    display: flex;
    font-size: 2rem;
    font-style: bold;
    margin: 1.3rem;
    
    @media (max-width: 650px) {
      font-size: 1.2rem;
    }
  }

  .button-information {
    width: auto;
  }

  .buttons-container {
    display: flex;
    justify-content: space-around;
    padding: 45px 20px 20px 20px;
  
    button {
      width: 250px;
      height: 60px;
      border-radius: 5px;
      font-size: large;
      transition: 0.15s;

      &:hover {
        cursor: pointer;
      }
    }
    
    .post-services {
      background-color: #4169e1;
      border: none;
      color: #fff;
      &:hover {
        transform: scale(1.02);
        background-color: #3159d1;
      }
    }

    .find-services {
      background: transparent;
      border: 3px solid #4169e1 !important;
      color: #4169e1;

      &:hover {
        transform: scale(1.02);
        border: 3px solid #4169e1 !important;
        background-color: #eee;
      }
    }

    @media (max-width: 650px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;

      button:first-child {
        margin-bottom: 10px;
      }
    }
  }

  .system-information {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 20px;
    
    p {
      width: 300px;
      margin: 0;
      padding: 0;
      text-align: center;
    }
    @media (max-width: 650px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;

      p:first-child {
        margin-bottom: 10px;
      }
    }
  }

  
`;
