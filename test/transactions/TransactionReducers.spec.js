import React from 'react';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
import moxios from 'moxios'
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import moment from 'moment';

import * as apiModule from './../../src/services/api';
import { FETCH_TRANSACTIONS, EDIT_TRANSACTION, SAVE_TRANSACTION } from './../../src/transactions/actions';
import transactionReducer from './../../src/transactions/reducers';

describe('Transactions Reducers', () => {

    const initialState = {
        transactions: [],
        isFetching: false,
        errors: {}
    }

    it('should return the initial state', () => {
        expect(
            transactionReducer(undefined, {})
        ).to.deep.equal(initialState);
    })

    it('should handle SAVE_TRANSACTION', () => {
        expect(
            transactionReducer(undefined, {
                type: SAVE_TRANSACTION,                    
            })
        ).to.deep.equal({
            isFetching: true,
            errors: {},
            transactions: []
        });
    })

    it('should handle successful SAVE_TRANSACTION', () => {
        expect(
            transactionReducer(undefined, {
                type: SAVE_TRANSACTION,
                result: 'success',
                transaction: { id: 1 }
            })
        ).to.deep.equal({
            isFetching: false,
            errors: {},
            transactions: [{ id: 1 }]
        });
    })

    it('should handle fail SAVE_TRANSACTION', () => {
        const errors = {
            value: 'invalid value',
            category: 'field is mandatory'
        }

        expect(
            transactionReducer(undefined, {
                type: SAVE_TRANSACTION,
                result: 'fail',
                errors
            })
        ).to.deep.equal({
            isFetching: false,
            errors,
            transactions: []
        });
    })

    it('should handle FETCH_TRANSACTIONS', () => {
        expect(
            transactionReducer(undefined, {
                type: FETCH_TRANSACTIONS,
            })
        ).to.deep.equal({
            isFetching: true,
            errors: {},
            transactions: []
        });
    })

    it('should handle successful FETCH_TRANSACTIONS', () => {
        const transactions = [ { id: 1 }, { id: 2 } ]

        expect(
            transactionReducer(undefined, {
                type: FETCH_TRANSACTIONS,
                result: 'success',
                transactions
            })
        ).to.deep.equal({
            isFetching: false,
            errors: {},
            transactions
        })
    })

    it('should handle fail FETCH_TRANSACTIONS', () => {
        const errors = { detail: 'unauthorized' };

        expect(
            transactionReducer(undefined, {
                type: FETCH_TRANSACTIONS,
                result: 'fail',
                errors
            })
        ).to.deep.equal({
            isFetching: false,
            errors,
            transactions: []
        })
    })

    xit('should handle EDIT_TRANSACTION', () => {
        const state = {
            transactions: [],
            openedTransaction: {},
            isFetching: false,
            errors: {},                
        }

        expect(
            transactionReducer(undefined, {
                type: EDIT_TRANSACTION,
                id: 1
            })
        ).to.deep.equal({
            isFetching: false,
            errors: {},
            transactions: [],
            editingTransaction: {}
        })
    })

    xit('should handle FINISH_TRANSACTION', () => {

    })
    
})