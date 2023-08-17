import {ComponentStory, ComponentMeta} from '@storybook/react';

import {SelectInputRounded} from './SelectInputRounded';

export default {
  title: 'UI/Select/Rounded',
  component: SelectInputRounded,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof SelectInputRounded>;

const Template: ComponentStory<typeof SelectInputRounded> = args => <SelectInputRounded {...args} />;

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
