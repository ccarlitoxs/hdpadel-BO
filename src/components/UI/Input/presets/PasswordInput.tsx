import {forwardRef} from 'react';
import {Input, InputProps} from '../Input';

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(({...props}: InputProps, ref) => {
  return <Input {...props} type='password' autoComplete='new-password' ref={ref} />;
});
PasswordInput.displayName = 'PasswordInput';
