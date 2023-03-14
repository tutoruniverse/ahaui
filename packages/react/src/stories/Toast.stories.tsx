import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Toast, { toast } from '../components/Toast';

export default {
  title: 'Toast',
  component: Toast,
} as ComponentMeta<typeof Toast>;

const Template : ComponentStory<typeof Toast> = (args) => (
  <>
    <button type="button" onClick={() => toast.success('Test')}>Show success toast</button>

    <button type="button" onClick={() => toast.error('Test')}>Show error toast</button>
    <Toast {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {};
