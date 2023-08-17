import {ComponentStory, ComponentMeta} from '@storybook/react';

import {EmailInput} from './EmailInput';

export default {
  title: 'UI/Input/Email',
  component: EmailInput,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof EmailInput>;

const Template: ComponentStory<typeof EmailInput> = args => <EmailInput {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  placeholder: 'Correo electrónico',
  label: 'Correo electrónico',
  id: 'email',
};

export const Value = Template.bind({});
Value.args = {
  placeholder: 'Correo electrónico',
  value: 'test@test.com',
  label: 'Correo electrónico',
  id: 'email',
};

export const Invalid = Template.bind({});
Invalid.args = {
  placeholder: 'Correo electrónico',
  value: 'test@test.com',
  label: 'Correo electrónico',
  id: 'email',
  error: 'El email no es válido',
};
