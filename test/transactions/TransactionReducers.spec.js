import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import * as apiModule from './../../src/services/api';
import { EXPENSE, INCOME } from './../../src/transactions/kinds';
import transactionReducer from './../../src/transactions/transactions/reducers';
import { 
    FETCH_TRANSACTIONS, 
    EDIT_TRANSACTION, 
    FINISH_EDIT_TRANSACTION, 
    SAVE_TRANSACTION,
    DELETE_TRANSACTION
 } from './../../src/transactions/transactions/actions';

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

        it('should be handled', () => {
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

        it('should be handled when successful', () => {
            const fetchingState = {
                ...initialState,
                isFetching: true
            }

            expect(
                transactionReducer(fetchingState, {
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

        it('should be handled when failed', () => {
            const fetchingState = {
                ...initialState,
                isFetching: true
            }
            const errors = {
                value: 'invalid value',
                category: 'field is mandatory'
            }

            expect(
                transactionReducer(fetchingState, {
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

        it('should be handled', () => {
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

        it('should be handled when successful', () => {
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

        it('should be handled when failed', () => {
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

        it('should concat new transactions', () => {
            const transactionsBefore = [ { id: 1, kind: INCOME.id }, { id: 2, kind: INCOME.id } ];
            const newTransactions = [ { id: 3, kind: EXPENSE.id }, { id:4, kind: EXPENSE.id } ];
            const transactionsAfter = [ ...transactionsBefore, ...newTransactions ]
            const initialState = {
                transactions: transactionsBefore,
                editingTransaction: {},
                isFetching: true,
                errors: {}
            }

            expect(
                transactionReducer(initialState, {
                    type: FETCH_TRANSACTIONS,
                    result: 'success',
                    transactions: newTransactions
                })
            ).to.deep.equal({
                ...initialState,
                isFetching: false,
                transactions: transactionsAfter
            })
        })

        it('should override old transactions', () => {
            const transactionsBefore = [ { id: 1, value: '10' }, { id: 2, value: '20' } ];
            const overrideTransactions = [ { id: 1, value: '50' }, { id: 2, value: '50' } ];
            const initialState = {
                editingTransaction: {},
                isFetching: true,
                errors: {},
                transactions: transactionsBefore,                
            }

            expect(
                transactionReducer(initialState, {
                    type: FETCH_TRANSACTIONS,
                    result: 'success',
                    transactions: overrideTransactions
                })
            ).to.deep.equal({                
                ...initialState,
                isFetching: false,
                transactions: overrideTransactions
            })
        })
    })

    describe('EDIT_TRANSACTION + FINISH_EDIT_TRANSACTION', () => {

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

    describe('DELETE_TRANSACTION', () => {
        const initialDeleteState = {
            transactions,
            editingTransaction: {},
            isFetching: false,
            errors: {},
        }

        it('should be handled', () => {
            expect(
                transactionReducer(initialDeleteState, {
                    type: DELETE_TRANSACTION,
                    id: 2
                })
            ).to.deep.equal({
                isFetching: true,
                errors: {},
                transactions,
                editingTransaction: {}
            });
        })

        it('should be handled when successful', () => {
            const fetchingState = {
                ...initialDeleteState,
                isFetching: true
            }
            const expectedTransactions = [
                { id: 1, value: '10' },
                { id: 3, value: '12' },
            ]

            expect(
                transactionReducer(fetchingState, {
                    type: DELETE_TRANSACTION,
                    id: 2,
                    result: 'success'
                })
            ).to.deep.equal({
                isFetching: false,
                errors: {},
                transactions: expectedTransactions,
                editingTransaction: {}
            });
        })

        it('should be handled when failed', () => {
            const fetchingState = {
                ...initialDeleteState,
                isFetching: true
            }

            expect(
                transactionReducer(fetchingState, {
                    type: DELETE_TRANSACTION,                    
                    result: 'fail',
                    errors: { 'detail' : 'couldnt delete' }
                })
            ).to.deep.equal({
                isFetching: false,
                errors: { 'detail': 'couldnt delete' },
                transactions,
                editingTransaction: {}
            });
        })

    })

})