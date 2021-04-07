import styled from 'styled-components';

interface ContainerProps {
  width?: string;
}

const ContainerBox = styled.div<ContainerProps>`
  max-width: ${({ width }) => width || '110rem'};
  margin: 0 auto;
  padding: 0 1.5rem;
  margin-top: 5rem;
  display: flex;
`;

const Container: React.FC<ContainerProps> = (props) => {
  return <ContainerBox {...props} />;
};

export default Container;
