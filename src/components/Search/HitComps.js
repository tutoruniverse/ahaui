import React from 'react';
import { Link } from 'gatsby';
import { Highlight, connectHits, connectHighlight } from 'react-instantsearch-dom';
import styled from 'astroturf';

const StyleLink = styled(Link)`
  @import '../../css/theme';
  mark {
    color: map-deep-get($colorsRender, 'text', 'dark');
    background: map-deep-get($colorsRender, 'background', 'warning');
  }
`;
const StyleSubLink = styled(Link)`
  @import '../../css/theme';
  composes:  u-textGray u-fontMedium u-marginBottomTiny from global;
`;
const StyleDesc = styled('div')`
  @import '../../css/theme';
  composes: u-textGray u-text100 u-marginBottomExtraSmall from global;
  mark {
    background: transparent;
    border-bottom: 2px solid map-deep-get($colorsRender, 'border', 'warning');
  }
`;
const StyleSubTitle = styled('div')`
  @import '../../css/theme';
  composes: u-marginBottomExtraSmall from global;
  mark {
    background: transparent;
    border-bottom: 2px solid map-deep-get($colorsRender, 'border', 'warning');
  }
`;

const CustomHighlight = connectHighlight(({ highlight, attribute, hit }) => {
  const parsedHit = highlight({
    highlightProperty: '_highlightResult',
    attribute,
    hit,
  });
  return (
    <div>
      {parsedHit.map((part, i) => {
        const title = hit[attribute][i].toLowerCase()
          .replace(/ /g, '-')
          .replace(/[^\w-]+/g, '');
        const path = `/${hit.path}/#${title}`;
        const isLast = i === parsedHit.length - 1;
        return (
          <React.Fragment key={path + i}>
            <StyleSubLink to={path}>
              {part.map(element => (
                element.isHighlighted ? (
                  <mark key={element.value}>{element.value}</mark>
                ) : (
                  <span key={element.value}>{element.value}</span>
                )
              ))}
            </StyleSubLink>
            {!isLast && <span className="u-marginHorizontalTiny">,</span>}
          </React.Fragment>
        );
      },
      )}
    </div>
  );
});
export default connectHits(function HitComp({ hits, onClick }) {
  return hits.map((hit) => {
    const path = `/${hit.path}/`;
    return (
      <div key={hit.objectID}>
        <StyleLink to={path} onClick={onClick} className="u-textDark">
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </StyleLink>
        <StyleDesc>
          <Highlight attribute="description" hit={hit} tagName="mark" />
        </StyleDesc>
        <StyleSubTitle>
          <div className="u-text200 u-marginBottomTiny">
            <CustomHighlight attribute="tocDepth2" hit={hit} tagName="mark" />
          </div>
          <div className="u-text100">
            <CustomHighlight attribute="tocDepth3" hit={hit} tagName="mark" />
          </div>
        </StyleSubTitle>
      </div>
    );
  });
});
