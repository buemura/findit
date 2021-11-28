import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 60px 0 0 0;
  padding: 0;
  width: 100%;
  min-height: calc(100vh - 60px);
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
    background-image: url("https://img.freepik.com/vetores-gratis/fundo-abstrato-premium-azul-escuro-minimalista-com-elementos-geometricos-escuros-de-luxo_272375-7.jpg?size=626&ext=jpg&ga=GA1.2.1746131912.1617494400");
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
  }

  /* Aparência que terá o seletor de arquivo */
  label {
    background-color: #4169e1;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    text-align: center;
    padding: 6px 20px;
  }

  input[type="file"] {
    display: none;
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: none;
    color: #eee;
    text-decoration: none;
    font-size: 0.8rem;
  }

  .input-photo-container {
    display: flex;
    flex-direction: column;
    color: #fff;
  }

  #photo-output {
    font-size: 0.8rem;
    margin-top: 0.3rem;
    max-width: 15rem;
  }

  .portfolio-image {
    height: 8rem;
    width: 8rem;
    border-radius: 10px;
    margin: 5px;

    &:hover {
      cursor: pointer;
    }
  }

  .divisions {
    display: flex;
    padding: 0 0 0.3rem 0;
    height: 2.3rem;

    span {
      width: 5.5rem;
      height: 100%;
      display: flex;
      align-items: center;
      margin: 0;
    }
  }
  .local-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }
  .country,
  .state,
  .city {
    width: 100%;
  }
  .country,
  .state {
    margin-right: 2rem;
  }
  .state,
  .city {
    span {
      width: 3rem;
    }
  }

  .buttons {
    margin: 2rem 0 0 0;
    width: 100%;
    display: flex;
    justify-content: center;
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

  .data-container {
    padding: 40px 0 10px 0;
    display: flex;
    flex-direction: column;
    width: 95%;

    .text-container {
      padding: 0.5rem;
      border: 1px #d7d7d7 solid;
      border-radius: 5px;
      margin-bottom: 1rem;

      .basic-informations {
        margin-bottom: 2rem;
      }

      h2 {
        margin: 0.3rem 0 1.3rem 0;
      }

      a {
        position: absolute;
        right: 0;
        bottom: 0;
        transform: translateY(10px);
        padding: 1rem;
        text-decoration: none;
        font-size: 0.8rem;

        img {
          width: 0.8rem;
          margin-right: 10px;
        }
      }

      h3 {
        text-align: left;
        margin: 7px 0;
        font-size: 1.2rem;
        font-weight: normal;
      }

      h1 {
        font-size: 2rem;
        text-align: left;
        margin: 7px 0;
      }
    }
  }

  .portifolio {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: relative;
    margin-bottom: 5rem;
    padding: 0.5rem;
    border: 1px #d7d7d7 solid;
    border-radius: 5px;

    a {
      position: absolute;
      right: 0;
      top: 20px;
      height: fit-content;
    }

    h2 {
      width: 100%;
      margin: 0.3rem 0 1.3rem 0;
    }

    .portfolio-container {
      display: flex;
      flex-direction: column;
      width: 100%;

      .portfolio-map {
        display: flex;
        margin: 0.3rem 0 0 0;

        .portfolio-image {
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          margin: 0;
          padding: 0;
          border-radius: 0.1rem 0 0 0.1rem;
          height: 3rem;
          min-width: 3rem;
          cursor: default;
        }

        .portfolio-input-container {
          display: flex;
          flex: 1;
          align-items: center;
          justify-content: space-between;

          .portfolio-description {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: center;
            padding: 0 1.2rem 0 1.2rem;
            background: #eeeeee;
            outline: none;
            border: none;
          }

          .portfolio-edit {
            display: flex;
            width: 7rem;
            height: 100%;
            justify-content: center;
            text-align: center;
            align-items: center;
            margin: 0;
            border-radius: 0 0.1rem 0.1rem 0;
            background: #4169e1;
            color: #fff;

            &:hover {
              background: #3a5dc4;
            }

            @media (max-width: 650px) {
              width: 3rem;
              font-size: 0.7rem;
            }
          }

          .portfolio-remove {
            display: flex;
            width: 7rem;
            height: 100%;
            justify-content: center;
            text-align: center;
            align-items: center;
            margin: 0;
            border-radius: 0 0.1rem 0.1rem 0;
            background: #d43844;
            color: #fff;
            cursor: pointer;

            &:hover {
              background: #cc3741;
            }

            @media (max-width: 650px) {
              width: 3rem;
              font-size: 0.7rem;
            }
          }

          .portfolio-input {
            height: 100%;
            margin: 0;
            padding: 0;
            border-radius: 0;
          }
        }
      }
    }

    .add-portfolio {
      .add-portfolio-button {
        margin: 0.3rem 0 0 0;
        display: flex;
        color: #fff;
        background: #1fb852;
        width: 7rem;
        height: 3rem;
        border-radius: 0.1rem;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:hover {
          background: #18a045;
        }
      }
    }
  }

  @media (max-width: 950px) {
    .local-container {
      flex-direction: column;
      width: 100%;
    }
    .country,
    .state {
      margin-right: 0;
    }
    .state,
    .city {
      span {
        width: 5.5rem;
      }
    }
  }
`;

export const InputText = styled.input`
  flex: 1;
  height: 100%;
  border-radius: 5px;
  outline: none;
  background: #eee;
  border: none;
  padding-left: 0.5rem;
`;

export const SelectStyled = styled.select`
  flex: 1;
  height: 100%;
  border-radius: 5px;
  outline: none;
  background: #eee;
  border: none;
  padding-left: 0.5rem;
`;

export const InputTextArea = styled.textarea`
  width: 100%;
  min-height: 5rem !important;
  padding: 0.5rem !important;
  line-break: auto;
  border-radius: 5px;
  outline: none;
  background: #eee;
  border: none;
  resize: vertical;
`;

export const ButtonsStyled = styled.button`
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
`;
