import {ComponentStory, ComponentMeta} from '@storybook/react';

import {TextArea} from './TextArea';

export default {
  title: 'UI/Input/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = args => <TextArea {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  placeholder: 'Mensaje (Opcional)',
  label: 'Mensaje',
  id: 'message',
};

export const Value = Template.bind({});
Value.args = {
  placeholder: 'Mensaje (Opcional)',
  value: 'Mensaje de ejemplo\ncon salto de líneas',
  label: 'Mensaje',
  id: 'message',
};

export const Invalid = Template.bind({});
Invalid.args = {
  placeholder: 'Mensaje (Opcional)',
  value: 'Mensaje de ejemplo\ncon salto de líneas',
  label: 'Mensaje',
  id: 'message',
  error: 'El máximo número de caracteres es 255',
};