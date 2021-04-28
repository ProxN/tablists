import styled from 'styled-components';

export const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 25rem 1fr;
  grid-column-gap: 3rem;
  width: 100%;
`;

export const AsideMenu = styled.aside`
  border-radius: ${({ theme }) => theme.borderRadius / 3}px;
  background: #fff;
  box-shadow: 0 0 5.49px 0.23px rgba(0, 0, 0, 0.08);
  padding: 1.5rem 2rem;
  height: min-content;

  button:first-child {
    margin-bottom: 1rem;
  }
`;
