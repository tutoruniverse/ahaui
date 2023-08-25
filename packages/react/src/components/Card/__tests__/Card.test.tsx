import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { ComponentCommonSize } from 'types/common';
import Card, { sizesClassName } from '..';

describe('components/Card', () => {
  const cardRef = createRef<HTMLDivElement>();
  const cardTitleRef = createRef<HTMLDivElement>();
  const cardHeaderRef = createRef<HTMLDivElement>();
  const cardBodyRef = createRef<HTMLDivElement>();

  const setup = (
    cardProps = {},
    cardTitleProps = {},
    cardHeaderProps = {},
    cardBodyProps = {},
  ) => {
    render(
      <Card ref={cardRef} {...cardProps}>
        <Card.Title ref={cardTitleRef} {...cardTitleProps}>
          Card Title
        </Card.Title>
        <Card.Header ref={cardHeaderRef} {...cardHeaderProps}>
          Card Header
        </Card.Header>
        <Card.Body ref={cardBodyRef} {...cardBodyProps}>Card Body</Card.Body>
      </Card>,
    );

    // Check if we can pass ref
    expect(cardRef.current).toBeTruthy();
    expect(cardTitleRef.current).toBeTruthy();
    expect(cardHeaderRef.current).toBeTruthy();
    expect(cardBodyRef.current).toBeTruthy();


    // Check if it renders correctly
    expect(cardRef.current).toHaveClass('Card');
    expect(cardTitleRef.current).toHaveClass('Card-title');
    expect(cardHeaderRef.current).toHaveClass('Card-header');
    expect(cardBodyRef.current).toHaveClass('Card-body');
  };

  describe('Render card without passing props', () => {
    it('should render card', () => {
      setup();

      // Check if component has default props set
      // Size medium
      const classNameSize = sizesClassName.medium;
      expect(cardHeaderRef.current).toHaveClass(classNameSize.content);
      expect(cardTitleRef.current).toHaveClass(classNameSize.title);
      expect(cardBodyRef.current).toHaveClass(classNameSize.content);

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
        expect(cardBodyRef.current).toHaveClass(classNameSize.content);
      },
    );

    it('should render with passing body prop', () => {
      setup({ body: true });

      // If body is set to true, there will be card body container covering children
      // So that card will only have one children
      expect(cardRef.current?.children.length).toEqual(1);
      expect(cardRef.current?.children[0]).toHaveClass('Card-body');
    });

    it('should render with as="span"', () => {
      setup(
        { as: 'span' },
        { as: 'span' },
        { as: 'span' },
        { as: 'span' },
      );
      [
        cardRef.current?.tagName,
        cardTitleRef.current?.tagName,
        cardHeaderRef.current?.tagName,
        cardBodyRef.current?.tagName,
      ].forEach(tagName => expect(tagName).toEqual('SPAN'));
    });

    it('should render with className', () => {
      setup(
        { className: 'cardClassName' },
        { className: 'cardTitleClassName' },
        { className: 'cardHeaderClassName' },
        { className: 'cardBodyClassName' },
      );
      expect(cardRef.current).toHaveClass('cardClassName');
      expect(cardTitleRef.current).toHaveClass('cardTitleClassName');
      expect(cardHeaderRef.current).toHaveClass('cardHeaderClassName');
      expect(cardBodyRef.current).toHaveClass('cardBodyClassName');
    });
  });
});
