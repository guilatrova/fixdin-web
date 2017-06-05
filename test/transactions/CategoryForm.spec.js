import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import CategoryForm from './../../src/transactions/components/CategoryForm';
import { 
    itShouldDisplayErrorForField, 
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
    });

})