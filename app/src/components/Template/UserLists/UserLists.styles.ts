import styled from 'styled-components';

export const UserListsContainer = styled.div`
  display: grid;
  grid-template-columns: 25rem 1fr;
  grid-column-gap: 3rem;
  width: 100%;
`;

export const UserListsSide = styled.aside`
  border-radius: ${({ theme }) => theme.borderRadius / 3}px;
  background: #fff;
  box-shadow: 0 0 5.49px 0.23px rgba(0, 0, 0, 0.08);
  padding: 1.5rem 2rem;
  height: min-content;

  button:first-child {
    margin-bottom: 1rem;
  }
`;

export const Box = styled.div`
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius / 3}px;
  background: #fff;
  box-shadow: 0 0 5.49px 0.23px rgba(0, 0, 0, 0.08);
  padding: 2rem 3rem;
`;

export const BoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

export const BoxHeading = styled.span`
  font-weight: 500;
  font-size: 2rem;
`;
