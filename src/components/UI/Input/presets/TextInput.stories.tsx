import {ComponentStory, ComponentMeta} from '@storybook/react';

import {TextInput} from './TextInput';

export default {
  title: 'UI/Input/Text',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = args => <TextInput {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  placeholder: 'www.example.com',
  label: 'Sitio web',
  id: 'web',
};

export const Value = Template.bind({});
Value.args = {
  placeholder: 'www.example.com',
  value: 'www.filtroo.com',
  label: 'Sitio web',
  id: 'web',
};

export const Invalid = Template.bind({});
Invalid.args = {
  placeholder: 'www.example.com',
  value: 'www.filtroo.com',
  label: 'Sitio web',
  id: 'web',
  error: 'El máximo número de caracteres es 255',
};
