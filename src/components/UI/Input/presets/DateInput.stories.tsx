import {ComponentStory, ComponentMeta} from '@storybook/react';

import {DateInput} from './DateInput';

export default {
  title: 'UI/Input/Date',
  component: DateInput,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof DateInput>;

const Template: ComponentStory<typeof DateInput> = args => <DateInput {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  placeholder: 'dd/MM/yyyy',
  label: 'Fecha de entrada',
  id: 'startDate',
};

export const Value = Template.bind({});
Value.args = {
  placeholder: 'dd/MM/yyyy',
  value: 'www.filtroo.com',
  label: 'Fecha de entrada',
  id: 'startDate',
};

export const Invalid = Template.bind({});
Invalid.args = {
  placeholder: 'dd/MM/yyyy',
  value: 'www.filtroo.com',
  label: 'Fecha de entrada',
  id: 'startDate',
  error: 'La fecha no es válida',
};