import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 60px 0 0 0;
  padding: 40px 0 10px 0;
  width: 100%;
  min-height: calc(100vh - 60px);
  overflow-x: hidden;
  background-color: #fff;

  .container {
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    padding: 0 0 0.3rem 0;
    height: 2.3rem;

    span {
      width: 8rem;
      height: 100%;
      display: flex;
      align-items: center;
      margin: 0;
    }

    input,
    select {
      flex: 1;
      height: 100%;
      border-radius: 5px;
      outline: none;
      background: #eee;
      border: none;
      padding-left: 0.5rem;
    }

    select {
      cursor: pointer;
    }

    textarea {
      flex: 1;
      min-height: 5rem !important;
      padding-left: 0.5rem !important;
      line-break: auto;
      border-radius: 5px;
      outline: none;
      background: #eee;
      border: none;
      resize: vertical;
    }
  }

  .description {
    height: auto;
  }

  .location {
    height: auto;

    div {
      flex: 1;
      height: auto;
      display: flex;
      flex-direction: column;
      height: calc(2.3rem * 3);
      
      .country, .state, .city {        
        display: flex;
        flex-direction: row;
        padding: 0 0 0.3rem 0;
        
        input,
        select {
          width: 80%;
          padding-left: 0.5rem;
        }

        select option * {
          padding: 10px;
        }

        select {
          &:hover {
            cursor: pointer;
          }
        }

        input:last-child {
          margin-right: 0;
        }
      }      
    }
  }

  .conclusion {
    display: flex;

    .conclusion--status {
      display: flex;
      align-items: center;

      input {
        height: 1.4rem;
        width: 1.4rem;
      }
    }
  }

  .avaliation {
    display: flex;

    .select-div {
      flex: 1;
      height: 100%;
      margin-right: 1rem;

      select {
        width: 100%;
        height: 100%;
      }
    }

    .stars {
      display: flex;
      height: 100%;
      width: calc(0.8rem * 10);

      .star {       
          cursor: pointer;
          height: 1.6rem;
          width: 0.8rem;
          background-size: cover;
          background-repeat: no-repeat;        
          filter: grayscale(1);
          -webkit-filter: grayscale(1) opacity(1);
          
          &:hover {
            filter: grayscale(0);
            -webkit-filter: grayscale(0) opacity(1);
          }
      }

      .star.v05,
      .star.v15,
      .star.v25,
      .star.v35,
      .star.v45 {
        background-position: left;
      }
      
      .star.v10,
      .star.v20,
      .star.v30,
      .star.v40,
      .star.v50 {
        background-position: right;
      }
    }
  }

  .buttons {
    margin: 2rem 0 5rem 0;
    width: 100%;
    display: flex;
    justify-content: center;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 0;
      height: 2.3rem;
      width: 10rem;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
      font-weight: bold;
      font-size: 0.9rem;
      border-radius: 5px;
      outline: none;
      border: none;
      margin: 0 0.5rem;

      &:hover {
        cursor: pointer;
      }
    }

    .save {
      border: 1px #23cf5c solid;
      background: #23cf5c;
      color: #fff;
      &:hover {
        background: #1fb852;
      }
    }
    .discart {
      border: 1px #d43844 solid;
      background: transparent;
      color: #d43844;
      &:hover {
        background: #f0f0f0;
        border: 1px #bf323d solid;
        color: #bf323d;
      }
    }
  }

  @media (max-width: 850px) {
    .location {
      height: 6.9rem;

      div {
        flex-direction: column;
        padding: 0 0 0.3rem 0;

        input,
        select {
          margin: 0 0 0.3rem 0;
        }

        &:last-child {
          margin: 0;
        }
      }
    }
  }

  @media (max-width: 650px) {    
    margin: 110px 0 0 0;
  }
`;
