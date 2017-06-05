import React from 'react';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import sinon from 'sinon';
import moxios from 'moxios'
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import moment from 'moment';

import CategoryForm from './../../src/transactions/components/CategoryForm';
import { 
    itShouldDisplayErrorForField, 
    itSubmitButtonShouldBeDisabledWhenFieldIsBlank,
    fillAllRequiredFields 
} from './../testHelpers';

describe('CategoryForm', () => {
    
    const defaultProps = { 
        onSubmit: () => {},
        isFetching: false,
    }

    describe('in any mode', () => {

        const requiredFields = ["name", "kind"];
        const triggerReference = 'FormControl[name="name"]';

        it('renders ok', () => {
            const wrapper = shallow(<CategoryForm {...defaultProps} />);
            expect(wrapper).to.be.ok;
        })

        itSubmitButtonShouldBeDisabledWhenFieldIsBlank(<CategoryForm {...defaultProps} />, triggerReference, requiredFields, 'name');
        itSubmitButtonShouldBeDisabledWhenFieldIsBlank(<CategoryForm {...defaultProps} />, triggerReference, requiredFields, 'kind');

    });

})