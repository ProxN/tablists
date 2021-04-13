import styled from 'styled-components';

export const ModalContainer = styled.div`
  height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgb(0 0 0 / 45%);
  z-index: 11;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius / 3}px;
  padding: 2rem 2.5rem;
  box-shadow: 0 0 5.49px 0.23px rgba(0, 0, 0, 0.1);
  background: #fff;
  max-width: 34rem;
`;

export const ModalHeader = styled.div`
  font-weight: 500;
  font-size: 1.8rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid rgba(217, 217, 217, 0.7);
  display: flex;
  justify-content: space-between;
`;

export const ModalBody = styled.div`
  margin: 1.2rem 0;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;

  button:nth-child(1) {
    margin-right: 1rem;
  }
`;
