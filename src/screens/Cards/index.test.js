import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../store';
import CardScreen from './';

describe("Cards component", () => {

    const component = shallow(
        <Provider store={store}>
            <CardScreen />
        </Provider>
    )

    describe("Render test", () => {
        it("renders Card screen without crashing", () => {
            component
        });
    });
});