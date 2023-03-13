// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import 'jest-canvas-mock';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

/**
 * Fixed: matchMedia not present, legacy browsers require a polyfill
 */
global.matchMedia = global.matchMedia || function () {
  return {
    matches: false,
    addListener() { },
    removeListener() { },
  };
};

// fetch
global.fetch = window.fetch;

// Setup enzyme
configure({ adapter: new Adapter() });

(window as any).flushPromises = () => new Promise((resolve) => {
  setImmediate(resolve);
});
