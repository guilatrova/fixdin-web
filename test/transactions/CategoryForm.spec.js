import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import CategoryForm from './../../src/transactions/categories/components/CategoryForm';
import {
    itShouldPassErrorMessageTo,
    itSubmitButtonShouldBeDisabledWhenFieldIsBlank,
    fillAllRequiredFields 
} from './../testHelpers';

describe('CategoryForm', () => {
    
    const defaultProps = { 
        onSubmit: () => {},
        isFetching: false,
        errors: {}
    }

    describe('in any mode', () => {

        const requiredFields = ["name", "kind"];
        const triggerReference = 'HorizontalFormGroupError[id="name"]';

        it('renders ok', () => {
            const wrapper = shallow(<CategoryForm {...defaultProps} />);
            expect(wrapper).to.be.ok;
        })

        itShouldPassErrorMessageTo(shallow(<CategoryForm {...defaultProps} />), 'name');
        itShouldPassErrorMessageTo(shallow(<CategoryForm {...defaultProps} />), 'kind');

        itSubmitButtonShouldBeDisabledWhenFieldIsBlank(shallow(<CategoryForm {...defaultProps} />), triggerReference, requiredFields, 'name');
        itSubmitButtonShouldBeDisabledWhenFieldIsBlank(shallow(<CategoryForm {...defaultProps} />), triggerReference, requiredFields, 'kind');

        it('submit button should be disabled when isFetching', () => {
            const wrapper = shallow(<CategoryForm {...defaultProps} isFetching={true} />);
            const input = wrapper.find(triggerReference);

            fillAllRequiredFields(input, requiredFields);

            expect(wrapper.find('Button[type="submit"]').prop('disabled')).to.be.true;
        })
    });

})