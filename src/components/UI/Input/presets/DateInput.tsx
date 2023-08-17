import {forwardRef} from 'react';
import {Input, InputProps} from '../Input';

export const DateInput = forwardRef<HTMLInputElement, InputProps>(({...props}: InputProps, ref) => {
  return <Input {...props} type='date' autoComplete='off' ref={ref} />;
});
DateInput.displayName = 'DateInput';
