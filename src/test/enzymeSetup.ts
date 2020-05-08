/* eslint-disable import/no-extraneous-dependencies */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';

configure({
  adapter: new Adapter(),
  // snapshotSerializers: ['jest-emotion'],
});
