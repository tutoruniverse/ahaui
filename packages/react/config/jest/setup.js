import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import $ from 'jquery';

// Setup enzyme
configure({ adapter: new Adapter() });

// Mocks
window.LogzioLogger = function() {
  this.log = () => {};
};

global.log = jest.fn();
global.logToQueue = jest.fn();

window.scrollTo = jest.fn();
window.open = jest.fn();
window.alert = jest.fn();

// fetch
global.fetch = require('jest-fetch-mock');


window.$ = window.jQuery = $;
