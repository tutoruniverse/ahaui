import React from 'react';
import { render, screen } from '@testing-library/react';
import Fade from 'components/Fade';
import { DropdownDirectionEnum, PlacementEnum } from 'types/common';
import * as CreatePopperConfig from 'utils/createPopperConfig';
import { setupWithUserEvent } from 'utils/test';
import Dropdown, { DropdownProps } from '..';
import { DropdownContainerProps } from '../Container';
import { DropdownToggleProps } from '../Toggle';
import { DropdownButtonProps } from '../Button';

jest.mock('../../../utils/createPopperConfig', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const spyCreatePopperConfig = jest.spyOn(CreatePopperConfig, 'default');

interface SimpleDropdownProps {
  dropdownProps?: DropdownProps;
  containerProps?: DropdownContainerProps,
  buttonProps?: Omit<DropdownButtonProps, 'children'>;
  toggleProps?: Omit<DropdownToggleProps, 'children'>;
  useToggle?: boolean,
  useTransition?: boolean,
}

describe('components/Dropdown', () => {
  let handleToggle: jest.Mock;

  beforeEach(() => {
    handleToggle = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const setup = (props: SimpleDropdownProps = {}) => {
    const SimpleDropdown = ({
      dropdownProps,
      containerProps,
      buttonProps,
      toggleProps,
      useToggle = false,
      useTransition = false,
    }: SimpleDropdownProps) => (
      <Dropdown
        {...dropdownProps}
        data-testid="dropdown"
      >
        {useToggle && (
          <Dropdown.Toggle
            {...toggleProps}
            data-testid="dropdown-toggle"
          >
            <button type="button">Customize Button</button>
          </Dropdown.Toggle>
        )}
        {!useToggle && (
          <Dropdown.Button
            {...buttonProps}
            data-testid="dropdown-button"
          >
            Dropdown Button
          </Dropdown.Button>
        )}
        <Dropdown.Container
          {...containerProps}
          transition={useTransition ? Fade : undefined}
          data-testid="dropdown-container"
        >
          <div>Container Text 1</div>
          <div>Container Text 2</div>
          <div>Container Text 3</div>
        </Dropdown.Container>
      </Dropdown>
    );

    const { rerender, ...rest } = setupWithUserEvent(render(<SimpleDropdown {...props} />));

    return {
      ...rest,
      rerender: (newProps: SimpleDropdownProps) => rerender(<SimpleDropdown {...newProps} />),
    };
  };

  // Button + container
  it.each(Object.values(DropdownDirectionEnum))('should handle controlled dropdown correctly', async (dropdownDirection) => {
    // Render component
    const { user, rerender } = setup({
      dropdownProps: {
        show: true,
        onToggle: handleToggle,
        drop: dropdownDirection,
      },
    });

    // Expect default rendering
    const container = screen.getByTestId('dropdown-container');
    expect(container).toHaveClass(`dropdown-${dropdownDirection}`);

    expect(screen.queryByText('Container Text 1')).toBeInTheDocument();

    // Toggle dropdown
    await user.click(screen.getByTestId('dropdown-button'));
    expect(handleToggle).toBeCalledTimes(1);

    // Rerender with different show
    rerender({
      dropdownProps: {
        show: false,
        onToggle: handleToggle,
      },
    });
    expect(screen.queryByText('Container Text 1')).not.toBeInTheDocument();
  });

  it('should render dropdown button correctly with default props', async () => {
    // Render component
    const { user } = setup();

    // Expect default rendering
    const triggerDropdown = screen.getByTestId('dropdown-button');
    expect(triggerDropdown).toBeInTheDocument();
    expect(screen.queryByText('Container Text 1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('fade-transition')).not.toBeInTheDocument();

    // It should handle dropdown
    await user.click(triggerDropdown);
    expect(screen.queryByText('Container Text 1')).toBeInTheDocument();

    const container = screen.getByTestId('dropdown-container');
    expect(container).toHaveClass('dropdown-down');
  });

  it('should render dropdown button correctly with given props', async () => {
    // Render component
    const { user } = setup({
      useTransition: true,
      dropdownProps: {
        className: 'DropdownTesting',
      },
      buttonProps: {
        className: 'ButtonTesting',
      },
      containerProps: {
        className: 'ContainerTesting',
      },
    });

    // Expect default rendering
    const dropdown = screen.getByTestId('dropdown');
    expect(dropdown).toHaveClass('DropdownTesting');

    const button = screen.getByTestId('dropdown-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('ButtonTesting');

    expect(screen.queryByText('Container Text 1')).not.toBeInTheDocument();

    // Toggle dropdown
    await user.click(button);
    expect(screen.queryByText('Container Text 1')).toBeInTheDocument();

    const container = screen.getByTestId('dropdown-container');
    expect(container).toHaveClass('ContainerTesting');
    expect(container).toHaveClass('Fade'); // additional class from Fade component used as Transition
  });

  it('should render dropdown toggle correctly with default props', async () => {
    // Render component
    const { user } = setup({
      useToggle: true,
    });

    // Expect default rendering
    const toggleElement = screen.getByTestId('dropdown-toggle');
    expect(toggleElement).toBeInTheDocument();
    expect(screen.queryByText('Container Text 1')).not.toBeInTheDocument();

    // It should handle dropdown
    await user.click(toggleElement);
    expect(screen.queryByText('Container Text 1')).toBeInTheDocument();
  });

  it('should render dropdown toggle with given props', async () => {
    // Render component
    const { user, rerender } = setup({
      useToggle: true,
      dropdownProps: {
        className: 'DropdownTesting',
      },
      toggleProps: {
        disabled: true,
        className: 'ToggleTesting',
      },
    });

    // Expect default rendering
    const dropdown = screen.getByTestId('dropdown');
    expect(dropdown).toHaveClass('DropdownTesting');

    const toggleElement = screen.getByTestId('dropdown-toggle');
    expect(toggleElement).toBeInTheDocument();
    expect(toggleElement).toHaveClass('ToggleTesting');

    const customizeButton = screen.queryByText('Customize Button');
    expect(customizeButton).toBeInTheDocument();

    expect(screen.queryByText('Container Text 1')).not.toBeInTheDocument();

    // Toggle dropdown
    await user.click(toggleElement);
    expect(screen.queryByText('Container Text 1')).not.toBeInTheDocument();

    rerender({
      useToggle: true,
      dropdownProps: {
        show: true,
        className: 'DropdownTesting',
        onToggle: handleToggle,
      },
      toggleProps: {
        className: 'ToggleTesting',
      },
    });

    // Toggle dropdown
    await user.click(toggleElement);
    expect(handleToggle).toBeCalledTimes(1);
    expect(screen.queryByText('Container Text 1')).toBeInTheDocument();
  });

  it('should have correct container closing using useRootClose', async () => {
    // Render component
    const { user } = setup({
      dropdownProps: {
        show: true,
        onToggle: handleToggle,
      },
    });

    // Expect default rendering
    expect(screen.queryByText('Container Text 1')).toBeInTheDocument();

    // Close container using ESC key
    await user.keyboard('{Escape}');

    expect(handleToggle).toBeCalledTimes(1);
  });

  it.each([
    [DropdownDirectionEnum.down, false, PlacementEnum.bottomStart],
    [DropdownDirectionEnum.down, true, PlacementEnum.bottomEnd],
    [DropdownDirectionEnum.up, false, PlacementEnum.topStart],
    [DropdownDirectionEnum.up, true, PlacementEnum.topEnd],
    [DropdownDirectionEnum.left, false, PlacementEnum.leftStart],
    [DropdownDirectionEnum.left, true, PlacementEnum.leftEnd],
    [DropdownDirectionEnum.right, false, PlacementEnum.rightStart],
    [DropdownDirectionEnum.right, true, PlacementEnum.rightEnd],
  ])('should handle popper placement correctly with given props', (drop, alignRight, placement) => {
    setup({
      dropdownProps: {
        alignRight,
        drop,
      },
    });

    expect(spyCreatePopperConfig).toHaveBeenCalled();
    expect(spyCreatePopperConfig.mock.calls[0][0].placement).toBe(placement);
  });
});
