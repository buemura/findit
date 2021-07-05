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

export const Filters = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  width: 50%;
  margin: 30px 0 0 0;
  button {
    margin: 0 5px 0 5px;
  }
`;

export const Feed = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  width: 50%;
  margin: 30px 0 0 0;
  background-color: #c9c9c9;
  border-radius: 25px;
`;
