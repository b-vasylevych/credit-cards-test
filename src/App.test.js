import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

describe("Rendering components", () => {
  it("renders App component without crashing", () => {
    shallow(<App />);
  });
});
