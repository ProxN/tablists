import styled, { css } from 'styled-components';

const CardContainer = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.bg.main};
    border-radius: ${theme.borderRadius / 2}px;
  `};
  width: 100%;
  box-shadow: 0 0 5.49px 0.23px rgba(0, 0, 0, 0.08);
  padding: 2.5rem 3rem;
`;

const Heading = styled.h1`
  font-size: 2.2rem;
  opacity: 0.9;
  margin-bottom: 3rem;
`;

interface CardProps {
  title?: string;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <CardContainer>
      <Heading>{title}</Heading>
      {children}
    </CardContainer>
  );
};

export default Card;
