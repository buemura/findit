import styled from "styled-components";

export const BodyStyled = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #e3e3e3;
  width: 100%;
  min-height: 100vh;

  * {
    font-family: "Roboto", sans-serif;
    box-sizing: border-box;
  }
`;

export const MiddleSection = styled.section`
  width: 80%;
  min-height: calc(100vh - 60px);
  margin-top: 60px;
  background: #fff;
  padding: 15px 30px 30px 30px;

  @media (max-width: 650px) {
    margin-top: 110px;
    width: 100%;
  }
`;
