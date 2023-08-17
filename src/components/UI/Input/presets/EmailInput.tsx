import {forwardRef} from 'react';
import {Input, InputProps} from '../Input';

export const EmailInput = forwardRef<HTMLInputElement, InputProps>(({...props}: InputProps, ref) => {
  return <Input {...props} type='email' ref={ref} autoComplete='email' />;
});
EmailInput.displayName = 'EmailInput';
