import {ComponentStory, ComponentMeta} from '@storybook/react';

import {SingleSelect} from './SingleSelect';

export default {
  title: 'UI/Select/Single',
  component: SingleSelect,
  argTypes: {onChangeValue: {action: 'clicked'}},
} as ComponentMeta<typeof SingleSelect>;

const Template: ComponentStory<typeof SingleSelect> = (args: any) => <SingleSelect {...args} />;

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
