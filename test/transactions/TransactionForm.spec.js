import React from 'react';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import sinon from 'sinon';
import moxios from 'moxios'
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import moment from 'moment';

import TransactionForm from './../../src/transactions/transactions/components/TransactionForm';
import { 
    itShouldDisplayErrorForField, 
    itShouldPassErrorMessageTo,
    itSubmitButtonShouldBeDisabledWhenFieldIsBlank,
    fillAllRequiredFields 
} from './../testHelpers';

describe('TransactionForm', () => {    
    
    const defaultProps = { 
        onSubmit: () => {},
        isFetching: false,
    }
    const submitButton = '#transaction-form-save-dropdown';

    describe('in any mode', () => {        

        const requiredFields = ["due_date", "value", "description", "category"];
        const triggerReference = 'HorizontalFormGroupError[id="deadline"]';

        it('renders ok', () => {
            const wrapper = shallow(<TransactionForm {...defaultProps} />);
            expect(wrapper).to.be.ok;
        })

        itShouldPassErrorMessageTo(shallow(<TransactionForm {...defaultProps} />), 'due_date');
        itShouldPassErrorMessageTo(shallow(<TransactionForm {...defaultProps} />), 'value');
        itShouldPassErrorMessageTo(shallow(<TransactionForm {...defaultProps} />), 'description');
        itShouldPassErrorMessageTo(shallow(<TransactionForm {...defaultProps} />), 'category');
        itShouldPassErrorMessageTo(shallow(<TransactionForm {...defaultProps} />), 'deadline');
        itShouldPassErrorMessageTo(shallow(<TransactionForm {...defaultProps} />), 'priority');
        itShouldPassErrorMessageTo(shallow(<TransactionForm {...defaultProps} />), 'details');
        itShouldPassErrorMessageTo(shallow(<TransactionForm {...defaultProps} />), 'payment_date');
        
        itSubmitButtonShouldBeDisabledWhenFieldIsBlank(shallow(<TransactionForm {...defaultProps} />), triggerReference, requiredFields, 'username', submitButton);
        itSubmitButtonShouldBeDisabledWhenFieldIsBlank(shallow(<TransactionForm {...defaultProps} />), triggerReference, requiredFields, 'due_date', submitButton);
        itSubmitButtonShouldBeDisabledWhenFieldIsBlank(shallow(<TransactionForm {...defaultProps} />), triggerReference, requiredFields, 'value', submitButton);
        itSubmitButtonShouldBeDisabledWhenFieldIsBlank(shallow(<TransactionForm {...defaultProps} />), triggerReference, requiredFields, 'description', submitButton);
        itSubmitButtonShouldBeDisabledWhenFieldIsBlank(shallow(<TransactionForm {...defaultProps} />), triggerReference, requiredFields, 'category', submitButton);

        it('submit button should be disabled when due_date is invalid', () => {
            const wrapper = shallow(<TransactionForm {...defaultProps} />);            
            const input = wrapper.find(triggerReference);
            
            fillAllRequiredFields(input, requiredFields);

            expect(wrapper.find(submitButton).prop('disabled')).to.be.true;
        })

        it('submit button should be enabled when required fields are correctly filled', () => {
            const wrapper = shallow(<TransactionForm {...defaultProps} />);            
            const input = wrapper.find(triggerReference);

            fillAllRequiredFields(input, requiredFields, { due_date: moment(new Date())});

            expect(wrapper.find(submitButton).prop('disabled')).to.be.false;
        })

        it('submit button is disabled when isFetching', () => {
            const wrapper = shallow(<TransactionForm {...defaultProps} isFetching={true} />);            
            const input = wrapper.find(triggerReference);

            fillAllRequiredFields(input, requiredFields);

            expect(wrapper.find(submitButton).prop('disabled')).to.be.true;
        })

        it('should calls onSubmit', () => {
            let submitSpy = sinon.spy();

            const wrapper = shallow(<TransactionForm {...defaultProps} onSubmit={submitSpy} />);
            
            wrapper.find(submitButton).simulate('click');

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