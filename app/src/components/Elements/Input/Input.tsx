import { forwardRef } from 'react';
import Icon from '@components/Elements/Icon';
import {
  InputBase,
  IconBox,
  InputContainer,
  InputStyleProps,
  Label,
} from './Input.styles';

interface InputProps
  extends InputStyleProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  label?: string;
}

type Ref = HTMLInputElement;

const Input = forwardRef<Ref, InputProps>((props, ref) => {
  const { icon, label, right, ...rest } = props;

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

  if (label) {
    return (
      <InputContainer>
        <Label>{label}</Label>
        {input}
      </InputContainer>
    );
  }
  return input;
});

Input.defaultProps = {
  right: false,
};

export default Input;
