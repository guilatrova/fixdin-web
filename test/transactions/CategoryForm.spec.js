import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import { EXPENSE } from './../../src/transactions/kinds';
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

    describe('in edit mode', () => {
        const editingCategory = {
            id: 2,
            name: 'eating out',
            kind: EXPENSE.id
        }

        it('should starts with category data filled in', () => {
            const wrapper = shallow(<CategoryForm {...defaultProps} category={editingCategory} />);

            const state = wrapper.state();

            for (let prop in editingCategory) {
                if (editingCategory.hasOwnProperty(prop)) {
                    expect(state[prop]).to.equal(editingCategory[prop]);
                }
            }
        })
    })

})