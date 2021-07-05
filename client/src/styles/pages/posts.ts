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

export const ServiceTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  width: 50%;
  margin: 50px 0 0 0;
  p {
    margin: 0 15px 0 15px;
  }
  input {
    width: 50%;
  }
`;

export const ServiceImage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  width: 50%;
  margin: 50px 0 0 0;
  p {
    margin: 0 15px 0 15px;
  }
  button {
    width: 10%;
    height: 30px;
    background-color: #fff;
    border: 1px solid #4169e1;
    border-radius: 5px;

    &:hover {
      cursor: pointer;
      background-color: #4169e1;
      color: #fff;
    }
  }
`;

export const ServiceCategory = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  width: 50%;
  margin: 50px 0 0 0;
  p {
    margin: 0 15px 0 15px;
  }
  input {
    width: 50%;
  }
`;

export const ServiceDescription = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  width: 50%;
  margin: 50px 0 0 0;
  p {
    margin: 0 15px 0 15px;
  }
  input {
    width: 50%;
    height: 100px;
  }
`;

export const ServicePrice = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  width: 50%;
  margin: 50px 0 0 0;
  p {
    margin: 0 15px 0 15px;
  }
  input {
    width: 20%;
  }
`;

export const ServiceLocation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  width: 50%;
  margin: 50px 0 0 0;
  p {
    margin: 0 15px 0 15px;
  }
  input {
    margin: 0 2px 0 2px;
  }
  #city {
    width: 20%;
  }
  #state {
    width: 4%;
  }
`;
