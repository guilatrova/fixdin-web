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
import { FETCH_TRANSACTIONS, EDIT_TRANSACTION, FINISH_EDIT_TRANSACTION, SAVE_TRANSACTION } from './../../src/transactions/actions';
import transactionReducer from './../../src/transactions/reducers';

describe('Transactions Reducers', () => {

    const initialState = {
        transactions: [],
        editingTransaction: {},
        isFetching: false,
        errors: {},
    }

    const transactions = [
        { id: 1, value: '10' },
        { id: 2, value: '11' },
        { id: 3, value: '12' },
    ]

    it('should return the initial state', () => {
        expect(
            transactionReducer(undefined, {})
        ).to.deep.equal(initialState);
    })

    describe('SAVE_TRANSACTION', () => {

        it('should handle SAVE_TRANSACTION', () => {
            expect(
                transactionReducer(undefined, {
                    type: SAVE_TRANSACTION,                    
                })
            ).to.deep.equal({
                isFetching: true,
                errors: {},
                transactions: [],
                editingTransaction: {}
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
                transactions: [{ id: 1 }],
                editingTransaction: {}
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
                transactions: [],
                editingTransaction: {}
            });
        })

        it('should add transaction result to transactions when id NOT in list', () => {
            const initialList = [ { id: 1, value: '10'}, { id: 2, value: '20' }]
            const transactionToSave = { id: 3, value: '30' }
            const expectedList = [ { id: 1, value: '10'}, { id: 2, value: '20' }, { ...transactionToSave } ]
            const state = {
                ...initialState,
                transactions: initialList
            }            

            expect(
                transactionReducer(state, {
                    type: SAVE_TRANSACTION,
                    result: 'success',
                    transaction: transactionToSave
                })
            ).to.deep.equal({
                isFetching: false,
                errors: {},
                transactions: expectedList,
                editingTransaction: {}
            });
        })

        it('should update transaction result to transactions when id in list', () => {
            const initialList = [ { id: 1, value: '10'}, { id: 2, value: '20' }]
            const transactionToSave = { id: 2, value: '100' }
            const expectedList = [ { id: 1, value: '10'}, { ...transactionToSave } ]
            const state = {
                ...initialState,
                transactions: initialList
            }            

            expect(
                transactionReducer(state, {
                    type: SAVE_TRANSACTION,
                    result: 'success',
                    transaction: transactionToSave
                })
            ).to.deep.equal({
                isFetching: false,
                errors: {},
                transactions: expectedList,
                editingTransaction: {}
            });
        })

    })

    describe('FETCH_TRANSACTIONS', () => {

        it('should handle FETCH_TRANSACTIONS', () => {
            expect(
                transactionReducer(undefined, {
                    type: FETCH_TRANSACTIONS,
                })
            ).to.deep.equal({
                isFetching: true,
                errors: {},
                transactions: [],
                editingTransaction: {}
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
                transactions,
                editingTransaction: {}
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
                transactions: [],
                editingTransaction: {}
            })
        })

    })

    describe('EDIT TRANSACTION', () => {

        it('should handle EDIT_TRANSACTION', () => {
            const state = {
                transactions,
                editingTransaction: {},
                isFetching: false,
                errors: {},
            }

            expect(
                transactionReducer(state, {
                    type: EDIT_TRANSACTION,
                    id: 1
                })
            ).to.deep.equal({
                transactions,
                isFetching: false,
                errors: {},            
                editingTransaction: transactions[0]
            })
        })

        it('should handle FINISH_EDIT_TRANSACTION', () => {
            let state = {
                transactions,
                editingTransaction: {},
                isFetching: false,
                errors: {},
            }
            state = transactionReducer(state, { type: EDIT_TRANSACTION, id: 1})

            expect(
                transactionReducer(state, {
                    type: FINISH_EDIT_TRANSACTION
                })
            ).to.deep.equal({
                isFetching: false,
                errors: {},
                transactions,
                editingTransaction: {}
            })
        })
    })

})