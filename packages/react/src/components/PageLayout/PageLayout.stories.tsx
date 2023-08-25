import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import PageLayout from 'components/PageLayout';

export default {
  title: 'PageLayout',
  component: PageLayout,
  argTypes: {
    as: { control: 'text' },
  },
} as ComponentMeta<typeof PageLayout>;

const Template : ComponentStory<typeof PageLayout> = (args) => (
  <PageLayout {...args}>
    <PageLayout.Header className="u-backgroundPrimaryLight">
      <div className="Container">
        Header
      </div>
    </PageLayout.Header>
    <PageLayout.Body className="u-backgroundLightest">
      <div className="Container">
        Body
      </div>
    </PageLayout.Body>
    <PageLayout.Footer className="u-backgroundPositiveLight">
      <div className="Container">
        Footer
      </div>
    </PageLayout.Footer>
  </PageLayout>
);

export const Default = Template.bind({});
Default.args = {};
