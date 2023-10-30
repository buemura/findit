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
  position: relative;
  user-select: none;

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

      img {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: 40px;
        box-sizing: border-box;
      }
    }
  }

  .containerLinks {
    padding: 0px;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
  }

  .search {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    height: 30px;
    box-sizing: border-box;

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

    .profileLinks {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      position: relative;
    }
    
    .pageLinks,
    .profileLinks {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      position: relative;
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
      position: relative;        
    
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
    
    .profileLinks {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      position: relative;        
    
      .notification {
        background: transparent;
        transition: 0.2s;
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

        span {
          color: #fff !important;
          display: none;
          font-weight: normal;
        }

        div {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          
          .chatImage {
            position: absolute;
            width: 25px;
          }

          .warning {
            position: absolute;
            width: 13px;
            transform: translate(80%, 60%);
            background: #fff;
            border-radius: 50%;
          }

          .warningSpan {
            display: none;
          }
        }
          
        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }

      .profile {
        color: white;
        transition: 0.2s;
        box-sizing: border-box;
        //position: relative;

        &:hover {
          cursor: pointer;
        }
      }

      .menu-open {
        width: 100px;
        background: #7f7f7f;
        position: fixed;
        right: 0;
        top: 0;
        transform: translate(0, 60px);
        margin: 0;
        padding: 10px 15px;
        user-select: none;

        ul {
          padding: 0;
          margin: 0;        
        }        
        
        a {
          width: 100%;
          color: #fff;
          padding: 0;
          margin: 0;
          border-radius: 0px;
          text-decoration: none;
        }

        li {
          display: flex;
          justify-content: center;
          padding-left: 20px;
          align-items: center;
          font-size: 12px;
          width: 100%;
          height: 100%;
          list-style: none;
          padding: 5px 6px;

          &:hover {
            background: #6f6f6f;
          }
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
  }
  
  .menu.active {
    background-color: #f7226a;
    box-sizing: border-box;

    &::after {
      transform: translateY(0px) rotate(-45deg);
    }

    &::before {
      transform: translateY(0px) rotate(45deg);
      box-shadow: 0 0 0 transparent;
      box-sizing: border-box;
    }
  }
  

  @media (max-width: 1000px) {
    .menu {
      display: flex;
    }

    .menu.active {
      box-shadow: none;
    }

    .menu-open {      
      transform: translate(85px, calc(100% + 15px));
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
      display: none !important;
    }

    .pageLinks.active {
      transform: translate(0%, 60px);
      display: flex !important;
      position: absolute;
      height: calc(100vh - 60px);
    }

    .pageLinks a {
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      margin: 30px !important;
      padding: 0px;
      width: 50% !important;
      height: 100%;
      border-radius: 10px;
    }
    
    .pageLinks a:hover {
      background: #4169e1 !important;
    }
  }

  @media (max-width: 800px) {
    .notification {
      background: transparent !important;
      border: none;
      transition: 0.2s;
      box-sizing: border-box;
      height: 50%;

      span {
        color: #fff !important;
        display: flex;
        font-weight: bold;
        margin-right: 30px;
      }

      div {
        position: relative;
        display: flex;
        justify-content: center;
      }

      .warningSpan {
        margin-right: 30px;
        align-items: center;
      }

      .chatImage {
        position: absolute;
      }

      .warning {
        position: absolute;
        width: 13px;
        transform: translate(80%, 60%);
        background: #fff;
        border-radius: 50%;
      }

      &:hover {
        background: #4169e1 !important;
      }
    }
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
      height: calc((100vh - 58px));
      transform: translate(100%, 60px);

      &.active {
        transform: translate(0%, 60px);
        display: flex;
        flex-direction: column;
      }

      .pageLinks {
        position: relative;
        background: #5179f1;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: calc((100%) / 5 * 3);
        transform: translate(0%, 0);
        
        &.active {
          display: flex;
          position: relative;
          width: 100%;
        }

        a {
          color: #fff;
          font-size: 18px;
          font-weight: bold;
          margin: 0;
          padding: 0;
          width: 75%;
          height: calc(100% / 3);
          border-radius: 10px;
          transition: 0.2s;
          
          &:hover {
            background: #4169e1;
          }
        }
      }
      
      .profileLinks {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        //height: calc((100%) / 5 * 2);
        //min-height: 300px;
        transform: translate(0%, -2px);
        background: #5179f1;

        .notification {
          color: #fff;
          font-size: 18px;
          font-weight: bold;
          margin: 0;
          padding: 0;
          width: 75%;
          height: 50%;
          border-radius: 10px;
          transition: 0.2s;
          background: #eee;
          color: #5179f1 !important;

          &:hover {
            background: #d5d5d5;
          }
        }

        .profile {          
          position: absolute;
          top: 0;
          height: 7rem !important;
          width: 7rem !important;
          transform: translate(0, calc(((100vh - 60px) / 5) + (((100vh - 60px) / 5 - 7rem) / 2)));
          color: #eee;
          border: 3px solid #eee !important;

          &:hover {
            background: #4169e1;
          }
        }
        
        .menu-open {      
          transform: translate(0, 100%);
          height: calc(((100vh - 60px) / 5));
          right: 0;
          width: 35%;

          ul {
            display: flex;
            height: 100%;
            flex-direction: column;
            justify-content: space-around;
            align-items: flex-start;          
          }
        }
      }      
    }
  }
  
  @media (max-width: 650px) {
    .notification {
      background: transparent !important;
      border: none;
      transition: 0.2s;
      box-sizing: border-box;

      span {
        color: #fff !important;
        display: flex;
        font-weight: bold;
        margin-right: 30px;
      }

      .warningSpan {
        margin-right: 30px;
        align-items: center;
      }

      div {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .chatImage {
        position: absolute;
        width: 25px;
      }

      .warning {
        position: absolute;
        width: 13px;
        transform: translate(80%, 60%);
        background: #fff;
        border-radius: 50%;
      }
    }
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
