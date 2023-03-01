import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Context from 'components/Form/Context';
import { Prev, Next, Ellipsis, PageItem } from './Item';

const propTypes = {
  /** PageItem size variants */
  sizeControl: PropTypes.oneOf(['small', 'medium', 'large']),
};


const defaultProps = {
  sizeControl: 'small',
};

const Pagination = React.forwardRef(({ className, sizeControl, as: Component = 'ul', ...props }, ref) => {
  const context = useMemo(() => ({ sizeControl }), [sizeControl]);
  return (
    <Context.Provider value={context}>
      <Component
        {...props}
        ref={ref}
        className={classNames(
          'Pagination',
          'u-marginNone u-paddingNone',
          className && className,
        )}
      />
    </Context.Provider>
  );
}
);

Pagination.Prev = Prev;
Pagination.Next = Next;
Pagination.Ellipsis = Ellipsis;
Pagination.Item = PageItem;
Pagination.displayName = 'Pagination';
Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;
