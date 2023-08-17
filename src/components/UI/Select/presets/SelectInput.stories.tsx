import {ComponentStory, ComponentMeta} from '@storybook/react';

import {SelectInput} from './SelectInput';

export default {
  title: 'UI/Select/Input',
  component: SelectInput,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof SelectInput>;

const Template: ComponentStory<typeof SelectInput> = args => <SelectInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  options: [
    {
      label: 'Opción 1',
      value: 'OPTION_1',
    },
    {
      label: 'Opción 2',
      value: 'OPTION_2',
    },
  ],
  value: 'OPTION_2',
  id: 'Select',
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  options: [
    {
      label: 'Opción 1',
      value: 'OPTION_1',
    },
    {
      label: 'Opción 2',
      value: 'OPTION_2',
    },
  ],
  value: 'OPTION_2',
  label: 'Eres...',
  id: 'Select',
};

export const WithError = Template.bind({});
WithError.args = {
  options: [
    {
      label: 'Opción 1',
      value: 'OPTION_1',
    },
    {
      label: 'Opción 2',
      value: 'OPTION_2',
    },
  ],
  value: 'OPTION_2',
  label: 'Eres...',
  error: 'Debes seleccionar una opción',
  id: 'Select',
};
export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  options: [
    {
      label: 'Selecciona una opción',
      value: '',
    },
    {
      label: 'Opción 1',
      value: 'OPTION_1',
    },
    {
      label: 'Opción 2',
      value: 'OPTION_2',
    },
  ],
  value: '',
  label: 'Eres...',
  id: 'Select',
};
