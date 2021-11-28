import router from "next/router";
import React from "react";
import styled from "styled-components";

export const Modal = ({ onClose, message }) => {
  onClose = () => {
    router.push("/home");
  };

  return (
    <StyledContainer>
      <StyledCentralContainer>
        <StyledP>{message}</StyledP>
        <StyledButton onClick={onClose}>Close</StyledButton>
      </StyledCentralContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  z-index: 9999999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCentralContainer = styled.div`
  display: flex;
  color: #fff;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: fit-content;
  border-radius: 0.3rem;
  background-color: #383844;
  position: relative;
`;

const StyledButton = styled.button`
  width: fit-content;
  height: 2.2rem;
  padding: 0 1rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  border: 1px transparent solid;
  border-radius: 0.3rem;
  outline: none;
  position: absolute;
  background: #4169e1;
  color: #fff;
  right: 0;
  bottom: 0;
  margin: 0.5rem;
  cursor: pointer;

  &:hover {
    background: #3557bd;
  }
`;

const StyledP = styled.p`
  font-size: 0.8rem;
  margin-bottom: 5rem;
  color: #fff;
  width: 100%;
  padding: 0.5rem 2rem 0.5rem 2rem;
`;
