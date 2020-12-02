import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import {
  InstantSearch,
  Index,
  connectStateResults,
} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import styled from 'astroturf';
import Input from './Input';
import Hits from './HitComps';

const Results = connectStateResults(
  ({ searching, searchState: state, searchResults: res }) => (searching && 'Searching...')
    || (res && res.nbHits === 0 && `No results for '${state.query}'`),
);

const Root = styled('div')`
  position: relative;
  display: grid;
  grid-gap: 1em;
`;

const HitsWrapper = styled('div')`
  @import '../../css/theme';
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
  const appKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY;
  const searchClient = algoliasearch(
    appId,
    appKey,
  );
  const show = query.length > 0 && focus && collapse;
  useClickOutside(wrapperRef, () => setFocus(false));

  return (
    <div className="u-flex u-widthFull" ref={wrapperRef}>
      <InstantSearch
        searchClient={searchClient}
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
              <img width="16" src={require('../../assets/algolia.svg')} alt="" />
             &nbsp;
              Algolia
            </a>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}
