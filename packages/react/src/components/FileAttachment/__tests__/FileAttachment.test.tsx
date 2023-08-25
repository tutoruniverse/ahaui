import React from 'react';
import { RenderResult, render, screen } from '@testing-library/react';
import { SetupWithUserEvent, setupWithUserEvent } from 'utils/test';
import FileAttachment, { FileAttachmentProps } from '..';

describe('components/FileAttachment', () => {
  let wrapper: SetupWithUserEvent<RenderResult>;
  const setup = (args: FileAttachmentProps) => {
    wrapper = setupWithUserEvent(render(<FileAttachment {...args} />));
  };
  const update = (args: FileAttachmentProps) => wrapper?.rerender(<FileAttachment {...args} />);

  describe('Render without passing props', () => {
    it('should render FileAttachment with default behavior', async () => {
      const mockFn = jest.fn();
      setup({
        onClose: mockFn,
      });
      const fileAttachment = screen.getByTestId('file-attachment');
      expect(fileAttachment).toHaveClass('Fade'); // default: transition = <Fade />

      // close button
      const closeButton = screen.getByTestId('close-button');
      expect(closeButton).not.toBeDisabled();
      expect(closeButton).toHaveClass('FileAttachment-remove');
      expect(closeButton.title).toBe('Remove this file');
      await wrapper.user.click(closeButton);
      expect(mockFn).toHaveBeenCalledTimes(1);
      await wrapper.user.click(closeButton);
      expect(mockFn).toHaveBeenCalledTimes(2);

      const icon = screen.getByTestId('close-icon');
      expect(icon).toHaveClass('u-opacityReset');
      await wrapper.user.unhover(closeButton);
      expect(icon).toHaveClass('u-opacityHalf');

      // wrapper file type icon + (file type label + file name)
      screen.getByTestId('file-type-icon');
      expect(screen.getByTestId('wrapper-file-type-label')).toHaveTextContent('undefined');
      expect(screen.getByTestId('file-name')).toHaveTextContent('undefined');

      // action left + action right
      expect(screen.queryByTestId('wrapper-attachment-action-left')).toEqual(null);
      expect(screen.queryByTestId('wrapper-attachment-action-right')).toEqual(null);
    });
  });

  describe('Render with passing props', () => {
    it('should hidden/show FileAttachment based on show prop', () => {
      setup({ show: false });
      expect(screen.queryByTestId('file-attachment')).toEqual(null);
    });

    it('should hidden/show closeButton based on onClose prop', async () => {
      setup({
        closeButton: false,
      });
      screen.getByTestId('file-attachment');
      expect(screen.queryByTestId('close-button')).toEqual(null);
    });

    describe('should render file type label based on file type label', () => {
      it('typeof file type label is string', () => {
        setup({
          fileTypeLabel: 'custom-label',
        });
        expect(screen.getByTestId('wrapper-file-type-label')).toHaveTextContent('custom-label');
      });

      it('typeof file type label is function', () => {
        setup({
          fileTypeLabel: () => 'file type label function',
        });
        expect(screen.getByTestId('wrapper-file-type-label')).toHaveTextContent('file type label function');
      });
    });

    it('should render file type label based on file type', () => {
      setup({
        fileType: 'image',
      });
      expect(screen.getByTestId('wrapper-file-type-label')).toHaveTextContent('png');
    });

    describe('should render actionLeft/actionRight based on actionLeft/actionRight', () => {
      it('typeof action left is string', () => {
        setup({
          actionLeft: 'action-left',
          actionRight: 'action-right',
        });
        expect(screen.getByTestId('wrapper-attachment-action-left')).toHaveTextContent('action-left');
        expect(screen.getByTestId('wrapper-attachment-action-right')).toHaveTextContent('action-right');
      });

      it('typeof action left is function', () => {
        setup({
          actionLeft: () => 'action left function',
          actionRight: () => 'action right function',
        });
        expect(screen.getByTestId('wrapper-attachment-action-left')).toHaveTextContent('action left function');
        expect(screen.getByTestId('wrapper-attachment-action-right')).toHaveTextContent('action right function');
      });
    });

    it('should render with className', () => {
      const className = 'fileAttachmentClassName';
      setup({ className });
      expect(screen.getByTestId('file-attachment')).toHaveClass(className);
    });

    it('should render without Transition', () => {
      setup({ transition: null });
      expect(screen.getByTestId('file-attachment')).not.toHaveClass('Fade');

      update({ transition: null, show: false });
      expect(screen.queryByTestId('file-attachment')).not.toBeInTheDocument();
    });
  });
});
