import { forwardRef } from 'react';
import Icon from '@components/Icon';
import { InputBase, IconBox, InputContainer, InputStyleProps } from './Input.styles';

interface InputProps
  extends InputStyleProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
}

type Ref = HTMLInputElement;

const Input = forwardRef<Ref, InputProps>((props, ref) => {
  const { icon, right, ...rest } = props;

  const input = <InputBase right={right} {...rest} ref={ref} />;

  if (icon) {
    return (
      <InputContainer>
        {input}
        <IconBox right={right}>
          <Icon name={icon} />
        </IconBox>
      </InputContainer>
    );
  }
  return input;
});

Input.defaultProps = {
  right: false,
};

export default Input;
