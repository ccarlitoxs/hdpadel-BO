import {forwardRef} from 'react';
import {Input, InputProps} from '../Input';

export const TextArea = forwardRef<HTMLInputElement, InputProps>(({...props}: InputProps, ref) => {
  return <Input {...props} textarea type='text' autoComplete='off' ref={ref} />;
});
TextArea.displayName = 'TextArea';
