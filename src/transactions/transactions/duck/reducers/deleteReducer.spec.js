import reducer from './deleteReducer';
import actions from '../actions';
import types from '../types';
import accountActions from '../../../accounts/duck/actions';

describe('transactions/duck/reducers/DELETE_TRANSACTION', () => {
    const transactions = [
        { id: 1, value: '10' },
        { id: 2, value: '11' },
        { id: 3, value: '12' },
    ];

    const initialDeleteState = {
        transactions,
        editingTransaction: {},
        isFetching: false,
        errors: {},
    };

    it('should be handled', () => {
        expect(
            reducer(initialDeleteState, actions.requestDeleteTransaction(2, types.DELETE_TRANSACTION))
        ).toEqual({
            isFetching: true,
            errors: {},
            transactions,
            editingTransaction: {}
        });
    });

    describe('when successful', () => {

        describe('Regular', () => {

            it('should handle type DELETE_TRANSACTION', () => {
                const fetchingState = {
                    ...initialDeleteState,
                    isFetching: true
                };
                const expectedTransactions = [
                    { id: 1, value: '10' },
                    { id: 3, value: '12' },
                ];

                expect(
                    reducer(fetchingState, actions.receiveDeleteTransaction('success', 2, types.DELETE_TRANSACTION))
                ).toEqual({
                    isFetching: false,
                    errors: {},
                    transactions: expectedTransactions,
                    editingTransaction: {}
                });
            });

        });

        describe('Periodic', () => {

            const periodicTransactions = [
                { id: 1, value: '10' },
                { id: 2, value: '11', bound_transaction: 2 },
                { id: 3, value: '12', bound_transaction: 2 },
                { id: 4, value: '12', bound_transaction: 2 },
                { id: 5, value: '12', bound_transaction: 2 },
            ];

            it('should handle type DELETE_ALL_PERIODIC_TRANSACTIONS', () => {
                const fetchingState = {
                    ...initialDeleteState,
                    transactions: periodicTransactions,
                    isFetching: true
                };
                const expectedTransactions = [
                    { id: 1, value: '10' }
                ];

                expect(
                    reducer(fetchingState, actions.receiveDeleteTransaction('success', 2, types.DELETE_ALL_PERIODIC_TRANSACTIONS))
                ).toEqual({
                    isFetching: false,
                    errors: {},
                    transactions: expectedTransactions,
                    editingTransaction: {}
                });
            });

            it('should handle type DELETE_THIS_AND_NEXT_TRANSACTIONS', () => {
                const fetchingState = {
                    ...initialDeleteState,
                    transactions: periodicTransactions,
                    isFetching: true
                };
                const expectedTransactions = [
                    { id: 1, value: '10' },
                    { id: 2, value: '11', bound_transaction: 2 }
                ];

                expect(
                    reducer(fetchingState, actions.receiveDeleteTransaction('success', 3, types.DELETE_THIS_AND_NEXT_TRANSACTIONS))
                ).toEqual({
                    isFetching: false,
                    errors: {},
                    transactions: expectedTransactions,
                    editingTransaction: {}
                });
            });

        });

        describe('Transfer', () => {

            const transferTransactions = [
                { id: 1, value: '10' },
                { id: 2, value: '11', bound_transaction: 3 },
                { id: 3, value: '11', bound_transaction: 2 },
                { id: 4, value: '20' },
            ];

            it('should handle account type DELETE_TRANSFER', () => {
                const fetchingState = {
                    ...initialDeleteState,
                    transactions: transferTransactions,
                    isFetching: true
                };
                const expectedTransactions = [
                    transferTransactions[0],
                    transferTransactions[3]
                ];

                expect(
                    reducer(fetchingState, accountActions.receiveDeleteTransfer(2, 'success'))
                ).toEqual({
                    isFetching: false,
                    errors: {},
                    transactions: expectedTransactions,
                    editingTransaction: {}
                });
            });

            it('should handle account type DELETE_TRANSFER when Transfer not found');

        });

    });

    it('should be handled when failed', () => {
        const fetchingState = {
            ...initialDeleteState,
            isFetching: true
        };
        const errors = { 'detail' : 'couldnt delete' };

        expect(
            reducer(fetchingState, actions.receiveDeleteTransaction('fail', 2, types.DELETE_TRANSACTION, errors))
        ).toEqual({
            isFetching: false,
            errors,
            transactions,
            editingTransaction: {}
        });
    });

    it('should returns default');

});