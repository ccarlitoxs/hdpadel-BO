import {HTMLAttributes, InputHTMLAttributes, ReactNode} from 'react';
import {Styles} from './Checkbox.styles';
import cn from 'classnames';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | ReactNode;
  containerProps?: HTMLAttributes<HTMLDivElement>;
}

export const Checkbox = ({containerProps, className, label, ...props}: CheckboxProps) => {
  const Label = getLabel(label);

  return (
    <Styles {...containerProps}>
      <label className='Checkbox__Label'>
        <input className={cn('Checkbox__Input', className)} type='checkbox' {...props} />
        {Label}
      </label>
    </Styles>
  );
}

function getLabel (label: CheckboxProps['label']) {
  if (typeof label === 'undefined') {
    return null;
  }

  if (typeof label === 'string') {
    return <p>{label}</p>;
  }

  return label;
}
