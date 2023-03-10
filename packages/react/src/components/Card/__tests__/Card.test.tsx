import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { ComponentCommonSize } from 'types/common';
import Card, { sizesClassName } from '..';

describe('components/Card', () => {
  const cardRef = createRef<HTMLDivElement>();
  const cardTitleRef = createRef<HTMLButtonElement>();
  const cardHeaderRef = createRef<HTMLDivElement>();
  const CardBodyRef = createRef<HTMLDivElement>();

  const setup = (cardProps = {}) => {
    render(
      <Card ref={cardRef} {...cardProps}>
        <Card.Title as="button" ref={cardTitleRef}>
          Card Title
        </Card.Title>
        <Card.Header className="u-text200" ref={cardHeaderRef}>
          Card Header
        </Card.Header>
        <Card.Body ref={CardBodyRef}>Card Body</Card.Body>
      </Card>,
    );

    // Check if we can pass ref
    expect(cardRef.current).toBeTruthy();
    expect(cardTitleRef.current).toBeTruthy();
    expect(cardHeaderRef.current).toBeTruthy();
    expect(CardBodyRef.current).toBeTruthy();

    // Check if it renders correctly
    expect(cardRef.current).toHaveClass('Card');
    expect(cardTitleRef.current).toHaveClass('Card-title');
    expect(cardHeaderRef.current).toHaveClass('Card-header');
    expect(CardBodyRef.current).toHaveClass('Card-body');
  };

  describe('Render card without passing props', () => {
    it('should render card', () => {
      setup();

      // Check if component has default props set
      // Size medium
      const classNameSize = sizesClassName.medium;
      expect(cardHeaderRef.current).toHaveClass(classNameSize.content);
      expect(cardTitleRef.current).toHaveClass(classNameSize.title);
      expect(CardBodyRef.current).toHaveClass(classNameSize.content);

      // Body default value will be false
      // If body is set to false, there will not be card body container covering children
      expect(cardRef.current?.children.length).toBeGreaterThan(1);
      expect(cardRef.current?.children[0]).not.toHaveClass('Card-body');
    });
  });

  describe('Render card with passing props', () => {
    it.each(['small', 'medium', 'large'] as ComponentCommonSize[])(
      'should render with size = "%s"',
      (size) => {
        setup({ size });

        const classNameSize = sizesClassName[size];
        expect(cardHeaderRef.current).toHaveClass(
          classNameSize.content,
        );
        expect(cardTitleRef.current).toHaveClass(classNameSize.title);
        expect(CardBodyRef.current).toHaveClass(classNameSize.content);
      },
    );

    it('should render with passing body prop', () => {
      setup({ body: true });

      // If body is set to true, there will be card body container covering children
      // So that card will only have one children
      expect(cardRef.current?.children.length).toEqual(1);
      expect(cardRef.current?.children[0]).toHaveClass('Card-body');
    });
  });
});
