import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import { IconNameEnum } from 'components/Icon';
import { setupWithUserEvent } from 'utils/test';
import TopMenu from '..';

interface SimpleTopMenuProps extends React.ComponentPropsWithoutRef<'div'> {
  current?: string;
  onItemSelect?: (path: string) => void;
  autoCollapse?: boolean;
}

describe('components/TopMenu', () => {
  let mockHandleItemSelect: jest.Mock;

  beforeEach(() => {
    mockHandleItemSelect = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const setup = (props: SimpleTopMenuProps = {}) => {
    const SimpleTopMenu = (topMenuProps: SimpleTopMenuProps) => {
      const [current, setCurrent] = useState('item-1');

      return (
        <TopMenu
          current={current}
          onItemSelect={setCurrent}
          {...topMenuProps}
          data-testid="top-menu-test-id"
        >
          <TopMenu.Item
            eventKey="item-1"
            badge="Testing Item Badge 1"
            className="ItemTestingClass"
            data-testid="item-1-test-id"
          >
            Item 1
          </TopMenu.Item>
          <TopMenu.Item
            disabled
            eventKey="item-2"
            badge="Testing Item Badge 2"
            data-testid="item-2-test-id"
          >
            Item 2
          </TopMenu.Item>
          <TopMenu.SubMenu
            eventKey="sub-menu"
            title="Sub-menu"
            badge="Testing Sub-menu Badge"
          >
            <TopMenu.Item
              eventKey="sub-menu-item-1"
              badge={() => <div className="CustomizedBadge">Testing Sub-menu Item Badge 1</div>}
              data-testid="sub-menu-item-1-test-id"
            >
              Sub-menu Item 1
            </TopMenu.Item>
            <TopMenu.Item
              disabled
              eventKey="sub-menu-item-2"
              data-testid="sub-menu-item-2-test-id"
            >
              Sub-menu Item 2
            </TopMenu.Item>
            Sub-menu Customized Item
          </TopMenu.SubMenu>
          Top-menu Customized Item
        </TopMenu>
      );
    };

    const { rerender, ...helpers } = setupWithUserEvent(render(<SimpleTopMenu {...props} />));

    return {
      ...helpers,
      rerender: (newProps: SimpleTopMenuProps = {}) => rerender(<SimpleTopMenu {...newProps} />),
    };
  };

  it('should render TopMenu null children', () => {
    //Render component
    render(
      <TopMenu
        data-testid="top-menu-test-id"
        current=""
        onItemSelect={() => null}
        // Disable for testing
        // eslint-disable-next-line react/no-children-prop
        children={[null, null]}
      />,
    );

    // Expect default rendering
    const topMenu = screen.queryByTestId('top-menu-test-id');
    expect(topMenu).toBeInTheDocument();
    expect((topMenu?.children.length)).toEqual(0);
  });

  it('should render SubMenu null children', async () => {
    // Render component
    const { user } = setupWithUserEvent(render(
      <TopMenu
        current="sub-menu"
        onItemSelect={() => null}
      >
        <TopMenu.SubMenu
          data-testid="sub-menu-test-id"
          eventKey="sub-menu"
          title="Sub-menu"
          // Disable for testing
          // eslint-disable-next-line react/no-children-prop
          children={[null, null]}
        />
      </TopMenu>,
    ));

    // Expect default rendering
    const subMenu = screen.queryByTestId('sub-menu-test-id');
    expect(subMenu).toBeInTheDocument();

    await user.click(screen.getByText('Sub-menu'));

    expect((subMenu?.children[1])).toHaveClass('Dropdown-container');
    expect((subMenu?.children[1].children.length)).toEqual(0);
  });

  it('should render and handle TopMenu correctly with default props', async () => {
    //Render component
    const { user } = setup();

    // Expect default rendering
    expect(screen.queryByText('Item 1')).toBeInTheDocument();
    expect(screen.queryByText('Item 2')).toBeInTheDocument();
    expect(screen.queryByText('Testing Item Badge 1')).toBeInTheDocument();
    expect(screen.queryByText('Testing Item Badge 1')).toHaveClass('Badge');
    expect(screen.queryByText('Testing Item Badge 1')).toHaveClass('u-backgroundPositive'); // expected to not be disabled
    expect(screen.queryByText('Top-menu Customized Item')).toBeInTheDocument();

    expect(screen.queryByText('Testing Item Badge 2')).toBeInTheDocument();
    expect(screen.queryByText('Testing Item Badge 2')).toHaveClass('Badge');
    expect(screen.queryByText('Testing Item Badge 2')).toHaveClass('u-backgroundUltraLight'); // expected to be disabled

    expect(screen.queryByText('Sub-menu')).toBeInTheDocument();
    expect(screen.queryByText('Sub-menu Item 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Sub-menu Item 2')).not.toBeInTheDocument();

    expect(screen.queryByTestId('item-1-test-id')?.parentNode).toHaveClass('is-active');
    expect(screen.queryByTestId('item-1-test-id')?.parentNode).toHaveClass('ItemTestingClass');

    expect(screen.queryByTestId('item-2-test-id')?.parentNode).not.toHaveClass('is-active');
    expect(screen.queryByTestId('item-2-test-id')?.parentNode).toHaveClass('is-disabled');

    // Toggle submenu
    await user.click(screen.getByText('Sub-menu'));

    expect(screen.queryByText('Sub-menu Item 1')).toBeInTheDocument();
    expect(screen.queryByText('Sub-menu Item 2')).toBeInTheDocument();
    expect(screen.queryByText('Testing Sub-menu Badge')).toBeInTheDocument();
    expect(screen.queryByText('Testing Sub-menu Badge')).toHaveClass('Badge');
    expect(screen.queryByText('Testing Sub-menu Item Badge 1')).toHaveClass('CustomizedBadge');
    expect(screen.queryByText('Sub-menu Customized Item')).toBeInTheDocument();

    expect(screen.queryByTestId('sub-menu-item-1-test-id')?.parentNode).not.toHaveClass('is-active');

    expect(screen.queryByTestId('sub-menu-item-2-test-id')?.parentNode).not.toHaveClass('is-active');
    expect(screen.queryByTestId('sub-menu-item-2-test-id')?.parentNode).toHaveClass('is-disabled');

    // Select other item
    await user.click(screen.getByTestId('sub-menu-item-1-test-id'));
    expect(screen.queryByText('Sub-menu Item 1')).toBeInTheDocument();
    expect(screen.queryByText('Sub-menu Item 2')).toBeInTheDocument();

    expect(screen.queryByTestId('item-1-test-id')?.parentNode).not.toHaveClass('is-active');
    expect(screen.queryByTestId('sub-menu-item-1-test-id')?.parentNode).toHaveClass('is-active');
  });

  it('should render and handle TopMenu correctly with given props', async () => {
    //Render component
    const { user } = setup({
      className: 'TopMenuTestingClass',
      autoCollapse: true,
    });

    // Expect default rendering
    expect(screen.queryByText('Item 1')).toBeInTheDocument();
    expect(screen.queryByText('Item 2')).toBeInTheDocument();
    expect(screen.queryByText('Sub-menu')).toBeInTheDocument();
    expect(screen.queryByText('Sub-menu Item 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Sub-menu Item 2')).not.toBeInTheDocument();

    const topMenu = screen.getByTestId('top-menu-test-id');
    expect(topMenu.parentNode).toHaveClass('TopMenuTestingClass');

    await user.click(screen.getByText('Sub-menu'));
    await user.click(screen.getByTestId('sub-menu-item-1-test-id'));
    expect(screen.queryByText('Sub-menu Item 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Sub-menu Item 2')).not.toBeInTheDocument();
  });

  it('should setup the right path for SubMenu Items', async () => {
    // Render component
    const { user } = setupWithUserEvent(render(
      <TopMenu
        current="home"
        onItemSelect={mockHandleItemSelect}
        data-testid="top-menu-test-id"
      >
        <TopMenu.SubMenu
          eventKey="home"
          title="Home"
        >
          <TopMenu.Item
            eventKey="setting-1"
          >
            Setting 1
          </TopMenu.Item>
          <TopMenu.Item
            separated
            eventKey="setting-2"
          >
            Setting 2
          </TopMenu.Item>
          <TopMenu.Item
            eventKey="#setting-3"
          >
            Setting 3
          </TopMenu.Item>
        </TopMenu.SubMenu>
      </TopMenu>,
    ));

    // Expect default rendering
    expect(screen.queryByText('Home')).toBeInTheDocument();

    await user.click(screen.getByText('Home'));

    expect(screen.queryByText('Setting 1')).toBeInTheDocument();
    expect(screen.queryByText('Setting 2')).toBeInTheDocument();
    expect(screen.queryByText('Setting 3')).toBeInTheDocument();

    await user.click(screen.getByText('Setting 1'));
    await user.click(screen.getByText('Setting 2'));
    await user.click(screen.getByText('Setting 3'));

    expect(mockHandleItemSelect).toBeCalledTimes(3);
    expect(mockHandleItemSelect.mock.calls).toEqual([
      ['home.setting-1'],
      ['setting-2'],
      ['home#setting-3'],
    ]);
  });

  it('should render icon correctly for SubMenu', async () => {
    // Render component
    const { user } = setupWithUserEvent(render(
      <TopMenu
        current="home"
        onItemSelect={() => null}
      >
        <TopMenu.SubMenu
          eventKey="home"
          title="Home"
          icon={IconNameEnum.pin}
        />
        <TopMenu.SubMenu
          eventKey="bot"
          title="Bot"
        >
          <TopMenu.SubMenu
            eventKey="config"
            title="Config"
          />
        </TopMenu.SubMenu>
      </TopMenu>,
    ));

    await user.click(screen.getByText('Bot'));

    expect(screen.queryByTestId('sub-menu-home-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('sub-menu-home-icon')).toHaveClass(`${IconNameEnum.pin}-icon`);

    expect(screen.queryByTestId('sub-menu-bot-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('sub-menu-bot-icon')).toHaveClass(`${IconNameEnum.arrowDown}-icon`);

    expect(screen.queryByTestId('sub-menu-bot.config-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('sub-menu-bot.config-icon')).toHaveClass(`${IconNameEnum.arrowForward}-icon`);
  });

  it('should handle highlightWhiteList correctly for SubMenu', async () => {
    // Render component
    render(
      <TopMenu
        current="home"
        onItemSelect={() => null}
      >
        <TopMenu.Item
          eventKey="home"
        >
          Home
        </TopMenu.Item>
        <TopMenu.SubMenu
          eventKey="bot"
          title="Bot"
          hightLightWhitelist={['home']}
        />
      </TopMenu>,
    );

    expect(screen.queryByText('Bot')?.parentNode?.parentNode).toHaveClass('u-textLink');
  });


  it('should render SubMenu with className', () => {
    render(
      <TopMenu
        current="sub-menu"
        onItemSelect={() => null}
      >
        <TopMenu.SubMenu
          data-testid="sub-menu-test-id"
          eventKey="sub-menu"
          title="Sub-menu"
          className="subMenuClassName"
        />
      </TopMenu>,
    );

    const subMenu = screen.queryByTestId('sub-menu-test-id');
    expect(subMenu).toHaveClass('subMenuClassName');
  });

  it('should render SubMenu with disabled badge', () => {
    render(
      <TopMenu
        current="sub-menu"
        onItemSelect={() => null}
      >
        <TopMenu.SubMenu
          data-testid="sub-menu-test-id"
          eventKey="sub-menu"
          title="Sub-menu"
          className="subMenuClassName"
          badge="Testing Item Badge 1"
          disabled
        />
      </TopMenu>,
    );

    const badge = screen.getByText('Testing Item Badge 1');
    expect(badge).toHaveClass('Badge u-textGray');
  });

  it('should render SubMenu with badge function', () => {
    render(
      <TopMenu
        current="sub-menu"
        onItemSelect={() => null}
      >
        <TopMenu.SubMenu
          data-testid="sub-menu-test-id"
          eventKey="sub-menu"
          title="Sub-menu"
          className="subMenuClassName"
          badge={() => <div>Testing Item Badge 1</div>}
        />
      </TopMenu>,
    );

    const badge = screen.getByText('Testing Item Badge 1');
    expect(badge.parentNode).toHaveClass('u-marginLeftExtraSmall');
  });
});
