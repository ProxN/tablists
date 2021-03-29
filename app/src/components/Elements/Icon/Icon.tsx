import { memo } from 'react';
import dynamic from 'next/dynamic';
import styled, { css } from 'styled-components';

const sizes = [2, 3, 4.6];

interface StyleProps {
  size?: number;
}

interface IconProps extends StyleProps {
  name: string;
}

const SvgBox = styled.div<StyleProps>`
  ${({ size }) => css`
    height: ${sizes[size || 0]}rem;
    width: ${sizes[size || 0]}rem;
  `};
  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`;

const DynamicIcon = (name: string) =>
  dynamic(() => import(`../../../assets/${name}.svg`));

const Icon: React.FC<IconProps> = ({ size, name }) => {
  const Ic = DynamicIcon(name);
  if (!Ic) return null;
  return (
    <SvgBox size={size}>
      <Ic />
    </SvgBox>
  );
};

export default memo(Icon);
