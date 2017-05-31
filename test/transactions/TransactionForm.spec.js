import React from 'react';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import sinon from 'sinon';
import moxios from 'moxios'
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import moment from 'moment';

import TransactionForm from './../../src/transactions/components/TransactionForm';
import { itShouldDisplayErrorForField } from './../testHelpers';

describe('TransactionForm', () => {    

    const defaultProps = { 
        onSubmit: () => {},
        isFetching: false,
        kind: 'income'
    }

    describe('in any mode', () => {
        it('renders ok', () => {
            const wrapper = shallow(<TransactionForm {...defaultProps} />);
            expect(wrapper).to.be.ok;
        })

        itShouldDisplayErrorForField(shallow(<TransactionForm {...defaultProps} />), 'due_date', 'dueDateGroup', 'invalid date');
        itShouldDisplayErrorForField(shallow(<TransactionForm {...defaultProps} />), 'value', 'valueGroup', 'invalid value');
        itShouldDisplayErrorForField(shallow(<TransactionForm {...defaultProps} />), 'description', 'descriptionGroup', 'invalid description');
        itShouldDisplayErrorForField(shallow(<TransactionForm {...defaultProps} />), 'category', 'categoryGroup', 'wrong category');
        itShouldDisplayErrorForField(shallow(<TransactionForm {...defaultProps} />), 'deadline', 'deadlineGroup', 'deadline invalid state');
        itShouldDisplayErrorForField(shallow(<TransactionForm {...defaultProps} />), 'importance', 'priorityGroup', 'invalid priority');
        itShouldDisplayErrorForField(shallow(<TransactionForm {...defaultProps} />), 'details', 'detailsGroup', 'wrong details supplied');

        const simulateChange = (input, name, value) => {
            input.simulate('change', { target: { name, value }});
        };

        const assertSubmitDisabled = (wrapper) => {
            const submitButton = wrapper.find('Button[type="submit"]');
            expect(submitButton.prop('disabled')).to.be.true;
        };

        const requiredFields = ["due_date", "value", "description", "category"];

        const itSubmitButtonShouldBeDisabledWhenFieldIsBlank = (field) => {
            it (`submit button should be disabled when ${field} is blank `, () => {
                const wrapper = shallow(<TransactionForm {...defaultProps} />);            
                const input = wrapper.find('FormControl[name="description"]'); //any input can trigger change

                for (let i = 0; i < requiredFields.length; i++) {
                    if (requiredFields[i] != field) {
                        simulateChange(input, requiredFields[i], 'any');
                    }
                    else {
                        simulateChange(input, requiredFields[i], '');
                    }
                }

                assertSubmitDisabled(wrapper);
            });
        }

        itSubmitButtonShouldBeDisabledWhenFieldIsBlank('due_date');
        itSubmitButtonShouldBeDisabledWhenFieldIsBlank('value');
        itSubmitButtonShouldBeDisabledWhenFieldIsBlank('description');
        itSubmitButtonShouldBeDisabledWhenFieldIsBlank('category');        

        const fillAllRequiredFields = (inputChangeTrigger, fieldsValue = {}) => {
            for (let i = 0; i < requiredFields.length; i++) {
                const field = requiredFields[i]; 
                const value = fieldsValue[field] || 'any';                
                simulateChange(inputChangeTrigger, field, value);
            }
        }

        it('submit button should be disabled when due_date is invalid', () => {
            const wrapper = shallow(<TransactionForm {...defaultProps} />);            
            const input = wrapper.find('FormControl[name="description"]'); //any input can trigger change
            
            fillAllRequiredFields(input);

            assertSubmitDisabled(wrapper);
        })

        it('submit button should be enabled when required fields are correctly filled', () => {
            const wrapper = shallow(<TransactionForm {...defaultProps} />);            
            const input = wrapper.find('FormControl[name="description"]'); //any input can trigger change
            
            fillAllRequiredFields(input, { due_date: moment(new Date())});

            const submitButton = wrapper.find('Button[type="submit"]');
            expect(submitButton.prop('disabled')).to.be.false;
        })

        it('submit button is disabled when isFetching', () => {
            const wrapper = shallow(<TransactionForm {...defaultProps} isFetching={true} />);            
            const input = wrapper.find('FormControl[name="description"]'); //any input can trigger change

            fillAllRequiredFields(input);

            assertSubmitDisabled(wrapper);
        })

        it('should calls OnSubmit', () => {
            let submitSpy = sinon.spy();

            const wrapper = mount(<TransactionForm {...defaultProps} onSubmit={submitSpy} />);
            wrapper.find('form').simulate('submit');

            expect(submitSpy.called).to.be.true;
        })
    })

    describe('in Edit mode', () => {
        const editingTransaction = {
            id: 1,
            account: 2,
            due_date: moment(new Date(2017, 3, 3)),
            description: 'editing this',
            category: '1',
            value: '15,00',
            details: 'more details'
        }

        it('starts with transaction data filled in', () => {
            const wrapper = shallow(<TransactionForm {...defaultProps} transaction={editingTransaction} />);

            const state = wrapper.state();

            for (let prop in editingTransaction) {
                if (editingTransaction.hasOwnProperty(prop)) {
                    expect(state[prop]).to.equal(editingTransaction[prop]);
                }
            }

        })
    })

})