import {HTMLAttributes, InputHTMLAttributes, ReactNode, forwardRef, ForwardedRef} from 'react';
import cn from 'classnames';
import {Styles} from './Input.styles';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  containerProps?: HTMLAttributes<HTMLDivElement>;
  label?: string | ReactNode;
  error?: string | ReactNode;
  textarea?: boolean;
}

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({containerProps, label, error, id, className, textarea, value, ...props}: InputProps, ref) => {
    const formattedLabel = getFormattedLabel(label, id);
    const formattedError = getFormattedError(error);

    const InputComponent = textarea ? (
      <textarea className={cn('Input TextArea', className)} id={id} ref={ref as ForwardedRef<HTMLTextAreaElement>} value={value} {...props} />
    ) : (
      <input type='text' className={cn('Input', className)} id={id} value={value} {...props} ref={ref as ForwardedRef<HTMLInputElement>} />
    );

    return (
      <Styles {...containerProps}>
        <div className='Container'>
          {formattedLabel}
          {InputComponent}
        </div>
        {formattedError}
      </Styles>
    );
  }
);
Input.displayName = 'Input';

function getFormattedLabel(label: InputProps['label'], id: InputProps['id']): ReactNode {
  if (!label) {
    return null;
  }

  if (typeof label === 'string') {
    return (
      <label htmlFor={id} className='Label'>
        {label}
      </label>
    );
  }

  return label;
}

function getFormattedError(error: InputProps['error']): ReactNode {
  if (!error) {
    return null;
  }

  if (typeof error === 'string') {
    return <span className='Error'>{error}</span>;
  }

  return error;
}
