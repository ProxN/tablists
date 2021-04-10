import styled, { css } from 'styled-components';
import { getColor, isLight } from '@components/utils/color';
import { Status } from '../types/commonTypes';
import Icon from '../Icon';

interface ToastProps {
  status?: Status;
  message?: string;
  onClose?: () => void;
}

const ToastContainer = styled.div<ToastProps>`
  height: 4.5rem;
  width: 100%;
  ${({ theme, status }) => {
    const col = getColor(theme.colors, status as string, 'main');
    return css`
      background: ${col};
      color: ${isLight(col) ? theme.colors.text : '#fff'};
    `;
  }}
`;

const ToastContent = styled.div`
  height: 100%;
  max-width: 110rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
`;

const Message = styled.span`
  color: inherit;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
`;

const Toast: React.FC<ToastProps> = (props) => {
  const { status = 'success', onClose, message } = props;
  return (
    <ToastContainer status={status}>
      <ToastContent>
        <Message>{message}</Message>
        <CloseButton onClick={onClose}>
          <Icon name='close' />
        </CloseButton>
      </ToastContent>
    </ToastContainer>
  );
};

export default Toast;
