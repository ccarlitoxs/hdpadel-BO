import {ComponentStory, ComponentMeta} from '@storybook/react';

import {PasswordInput} from './PasswordInput';

export default {
  title: 'UI/Input/Password',
  component: PasswordInput,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof PasswordInput>;

const Template: ComponentStory<typeof PasswordInput> = args => <PasswordInput {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  placeholder: 'Contraseña',
  label: 'Contraseña',
  id: 'password',
};

export const Value = Template.bind({});
Value.args = {
  placeholder: 'Contraseña',
  value: 'test@test.com',
  label: 'Contraseña',
  id: 'password',
};

export const Invalid = Template.bind({});
Invalid.args = {
  placeholder: 'Contraseña',
  value: 'test@test.com',
  label: 'Contraseña',
  id: 'password',
  error: 'La contraseña es inválida',
};
