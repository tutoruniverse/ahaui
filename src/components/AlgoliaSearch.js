import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import {
  InstantSearch,
  Index,
  Highlight,
  connectSearchBox,
  connectStateResults,
  connectHits,
  connectHighlight
} from 'react-instantsearch-dom';
import { Link } from 'gatsby';
import algoliasearch from 'algoliasearch';
import styled from 'astroturf';
import { Form } from '@ahaui/react';


const Root = styled('div')`
  position: relative;
  display: grid;
  grid-gap: 1em;
`;

const HitsWrapper = styled('div')`
  @import '../css/theme';
  composes: u-flexGrow-1 u-overflowScroll u-paddingSmall u-webkitScrollbar from global;
  max-height: 50vh;
  > * + * {
    padding-top: 1em;
    border-top: 1px solid #DFE1E6;
  }
  li + li {
    margin-top: 0.7em;
    padding-top: 0.7em;
    border-top: 1px solid #DFE1E6;
  }
  * {
    margin-top: 0;
    padding: 0;
  }
  ul {
    list-style: none;
  }
`;
const StyleLink = styled(Link)`
  @import '../css/theme';
  mark {
    color: map-deep-get($colors-render, 'text', 'dark');
    background: map-deep-get($colors-render, 'background', 'warning');
  }
`;
const StyleSubLink = styled(Link)`
  @import '../css/theme';
  composes:  u-textGray u-fontMedium u-marginBottomTiny from global;
`;
const StyleDesc = styled('div')`
  @import '../css/theme';
  composes: u-textGray u-text100 u-marginBottomExtraSmall from global;
  mark {
    background: transparent;
    border-bottom: 2px solid map-deep-get($colors-render, 'border', 'warning');
  }
`;
const StyleSubTitle = styled('div')`
  @import '../css/theme';
  composes: u-marginBottomExtraSmall from global;
  mark {
    background: transparent;
    border-bottom: 2px solid map-deep-get($colors-render, 'border', 'warning');
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
const Hits = connectHits(function HitComp({ hits, onClick }) {
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
const Input = connectSearchBox(({ refine, indexContextValue, currentRefinement, isSearchStalled, createURL, ...rest }) => (
  <Form className="u-flex u-widthFull">
      <Form.Input
      type="text"
      placeholder="Search"
      aria-label="Search"
      onChange={e => refine(e.target.value)}
      {...rest}
      />
  </Form>
));  
const Results = connectStateResults(
  ({ searching, searchState: state, searchResults: res }) => (searching && 'Searching...')
    || (res && res.nbHits === 0 && `No results for '${state.query}'`),
);

const useClickOutside = (ref, handler, events) => {
  const eventConst = events || ['mousedown', 'touchstart'];
  const detectClickOutside = event => !ref.current.contains(event.target) && handler();
  useEffect(() => {
    eventConst.forEach(event => (
      document.addEventListener(event, detectClickOutside)
    ));
    return () => {
      eventConst.forEach(event => (
        document.removeEventListener(event, detectClickOutside)
      ));
    };
  });
};


export default function Search({ indices, collapse }) {
  const wrapperRef = useRef(null);
  const [query, setQuery] = useState('');
  const [focus, setFocus] = useState(false);
  const appId = process.env.GATSBY_ALGOLIA_APP_ID;
  const searchKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY;
  // const searchClient = algoliasearch(appId,searchKey);
  const show = query.length > 0 && focus && collapse;
  useClickOutside(wrapperRef, () => setFocus(false));

  return (
    <div className="u-flex u-widthFull" ref={wrapperRef}>
      <InstantSearch
        // searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
        root={{ Root }}
      >
        <Input onFocus={() => setFocus(true)} />
        <div
          className={classNames(
            show ? 'u-flex' : 'u-hidden',
            'u-flexColumn u-zIndex2 u-roundedMedium u-positionAbsolute u-shadowMedium u-backgroundWhite',
          )}
          style={{
            width: '60vw',
            maxWidth: '30em',
            WebkitOverflowScrolling: 'touch',
            top: 'calc(100% + 0.5em)',
          }}
        >
          <HitsWrapper>
            {indices.map(({ name, type }) => (
              <Index key={name} indexName={name}>
                <Results />
                <Hits type={type} onClick={() => setFocus(false)} />
              </Index>
            ))}
          </HitsWrapper>

          <div
            className="u-textGray u-borderTop u-text200 u-flexInline u-justifyContentEnd u-paddingVerticalExtraSmall u-paddingHorizontalSmall"
          >
            Powered by
           &nbsp;
            <a href="https://algolia.com" className="u-flex u-alignItemsCenter u-textDark hover:u-textLight hover:u-textDecorationNone">
              <img width="16" src={require('../assets/algolia.svg')} alt="" />
             &nbsp;
              Algolia
            </a>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}
