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
import algoliasearch from 'algoliasearch/lite';
import { Form,createBlock } from '@ahaui/react3';


const Root = createBlock('InstantSearchRoot u-positionRelative');

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
            <Link className="u-textGray u-fontMedium u-marginBottomTiny" to={path}>
              {part.map(element => (
                element.isHighlighted ? (
                  <mark key={element.value}>{element.value}</mark>
                ) : (
                  <span key={element.value}>{element.value}</span>
                )
              ))}
            </Link>
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
        <Link to={path} onClick={onClick} className="StyleLink u-textDark">
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </Link>
        <div className="StyleDesc u-textGray u-text100 u-marginBottomExtraSmall">
          <Highlight attribute="description" hit={hit} tagName="mark" />
        </div>
        <div className="StyleSubTitle u-marginBottomExtraSmall">
          <div className="u-text200 u-marginBottomTiny">
            <CustomHighlight attribute="tocDepth2" hit={hit} tagName="mark" />
          </div>
          <div className="u-text100">
            <CustomHighlight attribute="tocDepth3" hit={hit} tagName="mark" />
          </div>
        </div>
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
  const searchClient = algoliasearch(appId,searchKey);
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
          <div className="HitsWrapper u-flexGrow1 u-overflowScroll u-paddingSmall u-webkitScrollbar">
            {indices.map(({ name, type }) => (
              <Index key={name} indexName={name}>
                <Results />
                <Hits type={type} onClick={() => setFocus(false)} />
              </Index>
            ))}
          </div>

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
