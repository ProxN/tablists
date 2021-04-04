import styled, { css } from 'styled-components';
import { Status } from '../types/commonTypes';
import { getColor } from '../../utils/color';

interface TextProps {
  status?: Status;
}

const BaseText = styled.span<TextProps>`
  ${({ theme, status }) => {
    const col = getColor(theme.colors, status as string, 'main');
    return css`
      color: ${col};
    `;
  }};
  display: block;
  font-size: 1.3rem;
  line-height: 1.45;
  margin-bottom: 1rem;
`;

const Text: React.FC<TextProps> = (props) => {
  return <BaseText {...props} />;
};
export default Text;
