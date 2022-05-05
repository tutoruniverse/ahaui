import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SlickBase from 'react-slick';
import createBlock from 'utils/createBlock';

const propTypes = {
  /**
   * The indicator inside content
   */
  dotInside: PropTypes.bool,
  /** [Define settings](https://react-slick.neostack.com/docs/api) */
  settings: PropTypes.object,
};

const defaultProps = {
  dotInside: false,
  settings: {
    infinite: true,
    dots: true,
  },
};

const Carousel = React.forwardRef(({ className, dotInside, settings, ...props }, ref) => (
  <SlickBase
    {...props}
    {...settings}
    ref={ref}
    className={classNames(
      'Carousel u-marginBottomMedium',
      dotInside && 'Carousel--dotsInside',
      className && className
    )}
  />
));

const Item = createBlock('Carousel-item u-lineHeightReset');

Carousel.displayName = 'Carousel';
Carousel.defaultProps = defaultProps;
Carousel.propTypes = propTypes;
Carousel.Item = Item;
export default Carousel;
