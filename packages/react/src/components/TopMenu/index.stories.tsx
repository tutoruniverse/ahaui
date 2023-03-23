import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Badge, BadgeVariant } from 'components/Badge';
import { TopMenu } from './index';

const TopMenuFn: any = TopMenu;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Navigator/TopMenu',
  component: TopMenuFn,
  argTypes: {
    current: {
      options: ['home', 'about', 'contact', 'sub-menu.whats-new'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof TopMenuFn>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TopMenuFn> = (args) => (
  <TopMenuFn {...args}>
    <TopMenuFn.Item eventKey="home">Home</TopMenuFn.Item>
    <TopMenuFn.SubMenu
      eventKey="products"
      badge={() => <Badge variant={BadgeVariant.POSITIVE_SUBTLE}>New</Badge>}
      title="Products"
    >
      <TopMenuFn.Item eventKey="excelchat">Excelchat</TopMenuFn.Item>
      <TopMenuFn.SubMenu
        badge={() => <Badge variant={BadgeVariant.POSITIVE_SUBTLE}>New</Badge>}
        eventKey="querychat"
        title="Querychat"
      >
        <TopMenuFn.Item eventKey="sqlquerychat">SQLQuerychat</TopMenuFn.Item>
        <TopMenuFn.Item eventKey="queryai">QueryAI</TopMenuFn.Item>
      </TopMenuFn.SubMenu>
      <TopMenuFn.Item
        eventKey="knp"
        disabled
      >
        KNP Project
      </TopMenuFn.Item>
    </TopMenuFn.SubMenu>
    <TopMenuFn.Item
      eventKey="platform"
      badge={() => <Badge variant={BadgeVariant.POSITIVE_SUBTLE}>New</Badge>}
    >
      Platform
    </TopMenuFn.Item>
    <TopMenuFn.Item
      eventKey="press"
      disabled
    >
      Press
    </TopMenuFn.Item>
    <TopMenuFn.SubMenu
      eventKey="blog"
      title="Blog"
    >
      <TopMenuFn.Item eventKey="excel_tutorial">Excel Tutorial</TopMenuFn.Item>
      <TopMenuFn.Item eventKey="excel_help">Excel Help</TopMenuFn.Item>
      <TopMenuFn.Item eventKey="excel_problems">Excel Problems</TopMenuFn.Item>
      <TopMenuFn.Item eventKey="sql_tutorial">SQL Tutorial</TopMenuFn.Item>
    </TopMenuFn.SubMenu>
    <TopMenuFn.Item
      eventKey="about"
      disabled
    >
      About
    </TopMenuFn.Item>
  </TopMenuFn>
);

export const Control = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Control.args = {
  current: 'home',
};
