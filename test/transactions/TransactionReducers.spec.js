import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import moment from 'moment';

import * as apiModule from './../../src/services/api';
import { EXPENSE, INCOME } from './../../src/transactions/kinds';
import reducer, { types } from './../../src/transactions/transactions/ducks';
import actions from './../../src/transactions/transactions/ducks/actions';

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

    const createTestTransaction = (transaction) => {
        const due_date = transaction.due_date || '2017-08-16'; 
        return {
            send: {
                value: 0,
                due_date,
                ...transaction                
            },
            expect: {
                payment_date: undefined,
                value: 0,
                ...transaction,
                due_date: moment(due_date, 'YYYY-MM-DD')
            }
        }
    }

    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).to.deep.equal(initialState);
    })

    describe('SAVE_TRANSACTION', () => {

        it('should be handled', () => {
            expect(
                reducer(undefined, actions.requestTransactions())
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
            };

            const transaction = createTestTransaction({ id: 1 });

            expect(
                reducer(fetchingState, actions.receiveSaveTransaction('success', transaction.send))
            ).to.deep.equal({
                isFetching: false,
                errors: {},
                transactions: [ transaction.expect ],
                editingTransaction: {}
            });
        });

        it('should be handled when failed', () => {
            const fetchingState = {
                ...initialState,
                isFetching: true
            };
            const errors = {
                value: 'invalid value',
                category: 'field is mandatory'
            };

            expect(
                reducer(fetchingState, actions.receiveTransactions('fail', errors))
            ).to.deep.equal({
                isFetching: false,
                errors,
                transactions: [],
                editingTransaction: {}
            });
        });

        it('should add transaction result to transactions when id NOT in list', () => {
            const initialList = [ createTestTransaction({ id: 1 }).expect, createTestTransaction({ id: 2 }).expect ]
            const transactionToSave = createTestTransaction({ id: 3 });
            const expectedList = [ ...initialList, transactionToSave.expect ]
            const state = {
                ...initialState,
                transactions: initialList
            }            

            expect(
                reducer(state, actions.receiveSaveTransaction('success', transactionToSave.send))
            ).to.deep.equal({
                isFetching: false,
                errors: {},
                transactions: expectedList,
                editingTransaction: {}
            });
        });

        it('should update transaction result to transactions when id in list', () => {
            const initialList = [ createTestTransaction({ id: 1 }).expect, createTestTransaction({ id: 2, value: 100 }).expect ]
            const transactionToSave = createTestTransaction({ id: 2, value: 200 });
            const expectedList = [ createTestTransaction({ id: 1 }).expect, transactionToSave.expect ]
            const state = {
                ...initialState,
                transactions: initialList
            }            

            expect(
                reducer(state, actions.receiveSaveTransaction('success', transactionToSave.send))
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
                reducer(undefined, actions.requestTransactions())
            ).to.deep.equal({
                isFetching: true,
                errors: {},
                transactions: [],
                editingTransaction: {}
            });
        })

        it('should be handled when successful', () => {
            const transactions = [ createTestTransaction({ id: 1}), createTestTransaction({ id: 2}) ]

            expect(
                reducer(undefined, actions.receiveTransactions('success', transactions.map(t => t.send)))
            ).to.deep.equal({
                isFetching: false,
                errors: {},
                transactions: transactions.map(t => t.expect),
                editingTransaction: {}
            })
        })

        it('should be handled when failed', () => {
            const errors = { detail: 'unauthorized' };

            expect(
                reducer(undefined, actions.receiveTransactions('fail', errors))
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
                reducer(initialState, {
                    type: types.FETCH_TRANSACTIONS,
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
                reducer(initialState, {
                    type: types.FETCH_TRANSACTIONS,
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
                reducer(state, {
                    type: types.EDIT_TRANSACTION,
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
            state = reducer(state, { type: types.EDIT_TRANSACTION, id: 1})

            expect(
                reducer(state, {
                    type: types.FINISH_EDIT_TRANSACTION
                })
            ).to.deep.equal({
                isFetching: false,
                errors: {},
                transactions,
                editingTransaction: {}
            })
        })
    })

    describe('COPY_TRANSACTION', () => {

        const initialCopyState = {
            ...initialState,
            transactions
        }

        it('should be handled', () => {
            expect(
                reducer(initialCopyState, {
                    type: types.COPY_TRANSACTION,
                    id: 1
                })
            ).to.deep.equal({
                isFetching: false,
                errors: {},
                transactions,
                editingTransaction: {
                    value: '10'
                }
            });
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
                reducer(initialDeleteState, {
                    type: types.DELETE_TRANSACTION,
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
                reducer(fetchingState, {
                    type: types.DELETE_TRANSACTION,
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
                reducer(fetchingState, {
                    type: types.DELETE_TRANSACTION,                    
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