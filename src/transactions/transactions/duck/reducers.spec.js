import { EXPENSE, INCOME } from '../../shared/kinds';
import reducer from './reducers'; 
import types from './types';
import actions from './actions';
import moment from 'moment';

describe('transactions/duck/reducers', () => {

    const initialState = {
        transactions: [],
        filters: {},
        visibleTransactions: undefined,
        editingTransaction: {},
        isFetching: false,
        errors: {},
    };

    const transactions = [
        { id: 1, value: '10' },
        { id: 2, value: '11' },
        { id: 3, value: '12' },
    ];

    const createTransaction = (transaction) => {
        const due_date = transaction.due_date || '2017-08-16'; 
        return {
            send: {
                value: 0,
                ...transaction,
                due_date,
            },
            expect: {
                payment_date: undefined,
                value: 0,
                ...transaction,
                due_date: moment(due_date, 'YYYY-MM-DD')
            }
        };
    };

    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(initialState);
    });

    describe('SAVE_TRANSACTION', () => {

        it('should be handled', () => {
            expect(
                reducer(undefined, actions.requestTransactions(types.SAVE_TRANSACTION))
            ).toEqual({
                ...initialState,
                isFetching: true,
            });
        });

        it('should be handled when successful', () => {
            const fetchingState = {
                ...initialState,
                isFetching: true
            };

            const transaction = createTransaction({ id: 1 });

            expect(
                reducer(fetchingState, actions.receiveSaveTransaction('success', [transaction.send], types.SAVE_TRANSACTION))
            ).toEqual({
                ...initialState,
                isFetching: false,
                errors: {},
                transactions: [ transaction.expect ],                
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
            ).toEqual({
                ...initialState,
                isFetching: false,
                errors,
                transactions: []
            });
        });

        it('should add transaction result to transactions when id NOT in list', () => {
            const initialList = [ createTransaction({ id: 1 }).expect, createTransaction({ id: 2 }).expect ];
            const transactionToSave = createTransaction({ id: 3 });
            const expectedList = [ ...initialList, transactionToSave.expect ];
            const state = {
                ...initialState,
                transactions: initialList
            };

            expect(
                reducer(state, actions.receiveSaveTransaction('success', [transactionToSave.send], types.SAVE_TRANSACTION))
            ).toEqual({
                ...initialState,
                isFetching: false,
                errors: {},
                transactions: expectedList
            });
        });

        it('should update transaction result to transactions when id in list', () => {
            const initialList = [ createTransaction({ id: 1 }).expect, createTransaction({ id: 2, value: 100 }).expect ];
            const transactionToSave = createTransaction({ id: 2, value: 200 });
            const expectedList = [ createTransaction({ id: 1 }).expect, transactionToSave.expect ];
            const state = {
                ...initialState,
                transactions: initialList
            };

            expect(
                reducer(state, actions.receiveSaveTransaction('success', [transactionToSave.send], types.SAVE_TRANSACTION))
            ).toEqual({
                ...initialState,
                isFetching: false,
                errors: {},
                transactions: expectedList
            });
        });

        it('should handle lists of transactions', () => {
            const initialList = [ createTransaction({ id: 1 }).expect, createTransaction({ id: 2 }).expect ];
            
            const generatedTransactions = [ createTransaction({ id: 3 }), createTransaction({ id: 4}) ];
            const transactionsExpected = generatedTransactions.map(t => t.expect);
            const transactionsSent = generatedTransactions.map(t => t.send);

            const expectedList = [ ...initialList, ...transactionsExpected ];
            const state = {
                ...initialState,
                transactions: initialList
            };

            expect(
                reducer(state, actions.receiveSaveTransaction('success', transactionsSent, types.SAVE_TRANSACTION))
            ).toEqual({
                ...initialState,
                isFetching: false,
                errors: {},
                transactions: expectedList
            });
        });

    });

    describe('FETCH_TRANSACTIONS', () => {

        it('should be handled', () => {
            expect(
                reducer(undefined, actions.requestTransactions())
            ).toEqual({
                ...initialState,
                isFetching: true
            });
        });

        it('should be handled when successful', () => {
            const transactions = [ createTransaction({ id: 1}), createTransaction({ id: 2}) ];

            expect(
                reducer(undefined, actions.receiveTransactions('success', transactions.map(t => t.send)))
            ).toEqual({
                ...initialState,
                isFetching: false,
                transactions: transactions.map(t => t.expect),
            });
        });

        it('should be handled when failed', () => {
            const errors = { detail: 'unauthorized' };

            expect(
                reducer(undefined, actions.receiveTransactions('fail', errors))
            ).toEqual({
                ...initialState,
                errors,
            });
        });

        it('should concat new transactions', () => {
            const transactionsBefore = [ createTransaction({ id: 1, kind: INCOME.id }).expect, createTransaction({ id: 2, kind: INCOME.id }).expect ];
            const newTransactions = [ createTransaction({ id: 3, kind: EXPENSE.id }).expect, createTransaction({ id:4, kind: EXPENSE.id }).expect ];
            const transactionsAfter = [ ...transactionsBefore, ...newTransactions ];
            const initialState = {
                transactions: transactionsBefore,
                editingTransaction: {},
                isFetching: true,
                errors: {}
            };

            expect(
                reducer(initialState, actions.receiveTransactions('success', newTransactions))
            ).toEqual({
                ...initialState,
                isFetching: false,
                transactions: transactionsAfter
            });
        });

        it('should override old transactions', () => {
            const transactionsBefore = [ { id: 1, value: '10' }, { id: 2, value: '20' } ];
            const overrideTransactions = [ { id: 1, value: '50' }, { id: 2, value: '50' } ];
            const initialState = {
                editingTransaction: {},
                isFetching: true,
                errors: {},
                transactions: transactionsBefore,                
            };

            expect(
                reducer(initialState, {
                    type: types.FETCH_TRANSACTIONS,
                    result: 'success',
                    transactions: overrideTransactions
                })
            ).toEqual({                
                ...initialState,
                isFetching: false,
                transactions: overrideTransactions
            });
        });
    });

    describe('EDIT_TRANSACTION + FINISH_EDIT_TRANSACTION', () => {

        it('should handle EDIT_TRANSACTION', () => {
            const state = {
                transactions,
                editingTransaction: {},
                isFetching: false,
                errors: {},
            };

            expect(
                reducer(state, actions.editTransaction(1))
            ).toEqual({
                transactions,
                isFetching: false,
                errors: {},            
                editingTransaction: transactions[0]
            });
        });

        it('should handle FINISH_EDIT_TRANSACTION', () => {
            let state = {
                transactions,
                editingTransaction: {},
                isFetching: false,
                errors: {},
            };
            state = reducer(state, actions.editTransaction(1));

            expect(
                reducer(state, actions.finishEditTransaction())
            ).toEqual({
                isFetching: false,
                errors: {},
                transactions,
                editingTransaction: {}
            });
        });
    });

    describe('COPY_TRANSACTION', () => {

        const initialCopyState = {
            ...initialState,
            transactions: [
                { id: 1, value: '10' },
                { id: 2, value: '11', bound_transaction: 2 },
                { id: 3, value: '12', bound_transaction: 2 },
            ]
        };

        it('should be handled', () => {
            expect(
                reducer(initialCopyState, actions.copyTransaction(3))
            ).toEqual({
                ...initialState,
                transactions: initialCopyState.transactions,
                editingTransaction: {
                    value: '12'
                }
            });
        });
    });

    describe('FILTER_TRANSACTIONS', () => {

        it('should be handled', () => {
            expect(
                reducer(undefined, actions.requestFilterTransactions())
            ).toEqual({
                ...initialState,
                isFetching: true,
            });
        });

        it('should be handled when successful', () => {
            const filtered = [
                createTransaction({ id: 1, description: '1' }),
                createTransaction({ id: 2, description: '2' })
            ];
            expect(
                reducer(undefined, actions.receiveFilteredTransactions('success', filtered.map(t => t.send)))
            ).toEqual({
                ...initialState,
                isFetching: false,
                transactions: filtered.map(t => t.expect),
                visibleTransactions: filtered.map(t => t.expect.id)
            });
        });

        it('should be handled when failed', () => {
            const errors = {
                detail: 'random error'
            };
            expect(
                reducer(undefined, actions.receiveFilteredTransactions('fail', errors))
            ).toEqual({
                ...initialState,
                isFetching: false,
                errors
            });
        });

    });

    describe('CLEAR_FILTERS', () => {
        it('should be handled', () => {
            const state = {
                ...initialState,
                filters: { due_date: 'due_date' },
                visibleTransactions: [ { id: 1 }, { id: 2 } ]
            };

            expect(
                reducer(state, actions.clearFilters())
            )
            .to.be.deep.equal(initialState);
        });
    });

    describe('SET_FILTERS', () => {
        it('should be handled', () => {
            const filters = { due_date: 'due_date', category: '1' };

            expect(
                reducer(initialState, actions.setFilters(filters))
            )
            .toEqual({
                ...initialState,
                filters
            });
        });
    });

    describe('PAY_TRANSACTIONS', () => {

        it('should be handled', () => {
            expect(
                reducer(undefined, actions.payTransactions([ 1, 2]))
            ).toEqual({
                ...initialState,
                isFetching: true
            });
        });

        it('should be handled when successful', () => {
            const transactions = [ createTransaction({ id: 1}), createTransaction({ id: 2}) ];
            
            expect(
                reducer(undefined, actions.receivePayTransactions('success', transactions.map(t => t.send)))
            ).toEqual({
                ...initialState,
                isFetching: false,
                transactions: transactions.map(t => t.expect),
            });
        });

        it('should be handled when failed', () => {
            const errors = { detail: 'unauthorized' };
                        
            expect(
                reducer(undefined, actions.receivePayTransactions('fail', errors))
            ).toEqual({
                ...initialState,
                isFetching: false,
                errors,
            });
        });

    });

});