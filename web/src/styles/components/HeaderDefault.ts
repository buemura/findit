import styled from "styled-components";

export const Container = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  display: block;
  z-index: 1000000;
  width: 100vw;
`;

export const Header = styled.div`
  margin: 20px;
  padding: 0;
  box-sizing: border-box;
  width: 100vw;
  height: 60px;
  background: #4169e1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  margin: 0;
  width: 100%;

  .divLogo {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default;
    box-sizing: border-box;
    
    a {
      text-decoration: none;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 26px;
      font-weight: 600;
      font-style: italic;
      margin-left: 10px;
      box-sizing: border-box;
    }

    img {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      width: 40px;
      box-sizing: border-box;
    }
  }  
  
  .containerLinks {
    padding: 0px;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;

    .search {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-right: 5px;
      height: 30px;
      box-sizing: border-box;
    }
    
    img {
      width: 20px;
      position: absolute;
      left: 10px;
    }

    input {
      height: 100%;
      width: 300px;
      border-radius: 15px 0 0 15px;
      outline: none;
      border: transparent;
      padding-left: 40px;
      box-sizing: border-box;
    }

    button {
      height: 100%;
      border: transparent;
      border-radius: 0 15px 15px 0;
      padding: 0 15px;
      transition: 0.2s;
      background: #ddd;
      font-weight: bold;
      font-size: 14px;
      box-sizing: border-box;

      &:hover {
        background: #f7226a;
        color: #fff;
      }
    }

    .menuItems {
      display: flex;
      transition: 0.2s;
      box-sizing: border-box;
      height: 30px;

      .pageLinks {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;

        a {
          width: 70px;
          height: 100%;
          margin: 0 3px;
          border-radius: 10px;
          outline: none;
          font-size: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          text-decoration: none;
          color: #fff;
          border: none;
          box-sizing: border-box;
          transition: 0.2s;

          &:hover {
            background: #5179f1;
          }
        }
      }

      .loginLinks {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;

        a {
          width: 70px;
          height: 100%;
          margin: 0 3px;
          border-radius: 10px;
          outline: none;
          font-size: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          text-decoration: none;
          color: #fff;
          border: none;
          box-sizing: border-box;
        }
      }

      .loginLinks {
        .login {
          background: #fff;
          border: 1px solid #fff;
          color: #4169e1 !important;
          font-weight: bold;
          transition: 0.2s;
          box-sizing: border-box;

          &:hover {
            background: #eee;
          }
        }

        .register {
          background: transparent;
          border: 1px solid #fff !important;
          color: white;
          transition: 0.2s;
          box-sizing: border-box;

          &:hover {
            background: #3159d1;
            box-sizing: border-box;
          }
        }
      }
    }
    
    .menu {
      width: 30px;
      height: 30px;
      justify-content: center;
      align-items: center;
      display: none;
      flex-direction: column;
      margin: 0 0 0 25px;
      cursor: pointer;
      box-sizing: border-box;

      &::before {
        content: "";
        position: absolute;
        width: 30px;
        height: 3px;
        background: #fff;
        transition: 0.2s;
        transform: translateY(-12px);
        box-shadow: 0 13px 0 #fff;
        box-sizing: border-box;
      }

      &::after {
        content: "";
        position: absolute;
        width: 30px;
        height: 3px;
        background: #fff;
        transition: 0.2s;
        transform: translateY(13px);
        box-sizing: border-box;
      }
    }

    .menu.active {
      background-color: #f7226a;
      box-sizing: border-box;

      &::before {
        transform: translateY(0px) rotate(45deg);
        box-shadow: 0 0 0 transparent;
        box-sizing: border-box;
      }

      &::after {
        transform: translateY(0px) rotate(-45deg);
      }
    }
  }







  @media (max-width: 1000px) {
    .menu {
      display: flex;
    }
    .menu.active {
      box-shadow: none;
    }
    .pageLinks {
      position: absolute;
      background: #5179f1;
      flex-direction: column;
      top: 0;
      right: 0;
      width: 100%;
      height: calc(100% - 60px);
      transform: translate(100%, 60px);
      display: none;
      
      a {
        color: #fff;
        font-size: 18px;
        font-weight: bold;
        margin: 30px;
        padding: 0px;
        width: 50%;
        height: 100%;
        border-radius: 10px;

        &:hover {
          background: #4169e1;
        }
      }
    }
    .pageLinks.active {
      transform: translate(0%, 60px);
      display: flex;
      position: absolute;
      height: calc(100vh - 60px);
    }
  }

  @media (max-width: 800px) {
    .search {
      margin-right: 25px;
    }
    .menu {
      display: flex;
      margin: 0;
    }
    .menu.active {
      box-shadow: none;
    }
    .menuItems {
      position: absolute;
      display: none;
      flex-direction: column;
      top: 0;
      left: 0;
      width: 100%;
      height: calc((100vh - 60px));
      transform: translate(100%, 60px);
    }
    .pageLinks {
      position: relative;
      background: #5179f1;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: calc((100vh - 60px) / 5 * 3);
      transform: translate(0%, 0);
    }
    .pageLinks.active {
      position: relative;
      width: 100%;
      height: calc((100vh - 60px) / 5 * 3);
    }
    .menuItems.active {
      transform: translate(0%, 0px);
      display: flex;
    }
    .loginLinks {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: calc((100vh - 60px) / 5 * 2);
      min-height: 300px;
      transform: translate(0%, 60px);
      background: #5179f1;
    }
    .pageLinks a,
    .loginLinks a {
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      margin: 25px;
      padding: 0px;
      width: 75%;
      height: 100%;
      border-radius: 10px;
      transition: 0.2s;
    }
    .pageLinks a:hover {
      background: #4169e1;
    }
    .loginLinks .login {
      background: #eee;
      color: #5179f1 !important;
    }
    .loginLinks .login:hover {
      background: #d5d5d5;
    }
    .loginLinks .register {
      color: #eee;
      border: 3px solid #eee !important;
    }
    .loginLinks .register:hover {
      background: #4169e1;
    }
  }
  @media (max-width: 650px) {
    .search {
      position: absolute;
      background: #5179f1;
      top: 60px;
      left: 0;
      width: 100%;
      height: 50px;
      padding: 0 20px 0 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .search input,
    .search button {
      height: 30px;
    }
    .search input {
      min-width: 250px;
    }
    .search img {
      position: relative;
      transform: translateX(20px);
    }
  }
`;
