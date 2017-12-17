import selectors from './selectors';
import { INCOME, EXPENSE } from '../../kinds';
import moment from 'moment';

describe('transactions/duck/selectors', () => {
    const buildState = (state) => {
        return {
            transactions: state
        };
    };

    const buildTransactionsUntil = (length, ...other) => {
        const transactions = [];
        for (let i = 0; i < length; i++) {
            transactions[i] = { id: i+1, ...other };
        }
        return transactions;
    };

    it('getErrors', () => {
        const state = buildState({
            errors: 'errors'
        });

        expect(
            selectors.getErrors(state)
        )
        .toEqual('errors');
    });

    it('getEditingTransaction', () => {
        const editingTransaction = { id: 5 };
        const state = buildState({
            editingTransaction
        });

        expect(
            selectors.getEditingTransaction(state)
        )
        .toEqual(editingTransaction);
    });

    it('isFetching', () => {
        const state = buildState({
            isFetching: true
        });

        expect(
            selectors.isFetching(state)
        )
        .to.be.true;
    });

    it('getFilters', () => {
        const filters = { due_date: 'due_date' };
        const state = buildState({ filters });

        expect(
            selectors.getFilters(state)
        )
        .toEqual(filters);
    });

    describe('getTransactionsToDisplay', () => {
        
        it('should return visibleTransactions', () => {        
            const visibleTransactions = buildTransactionsUntil(3).map(t => t.id);
            const transactions = buildTransactionsUntil(5);
            const state = buildState({
                transactions,
                visibleTransactions
            });

            expect(
                selectors.getTransactionsToDisplay(state)
            )
            .toEqual(transactions.slice(0,3));
        });

        it('should return all when visibleTransactions is undefined', () => {
            const transactions = buildTransactionsUntil(2);
            const state = buildState({
                transactions,
                visibleTransactions: undefined
            });

            expect(
                selectors.getTransactionsToDisplay(state)
            )
            .toEqual(transactions);
        });        

    });

    it('getPendingTransactions');

    describe('getPendingIncomesUntil', () => {

        const payment_date = moment();
        const due_date = moment(new Date(2017, 0, 1));
        const transactions = [
            { id: 1, due_date, kind: INCOME.id, payment_date: null },
            { id: 2, due_date, kind: INCOME.id, payment_date },
            { id: 3, due_date, kind: INCOME.id, payment_date },
            { id: 4, due_date: moment(new Date(2018, 0, 1)), kind: INCOME.id, payment_date: null },
            { id: 5, due_date, kind: EXPENSE.id, payment_date: null}
        ];
        const state = buildState({ transactions });

        it('until is undefined', () => {
            const expected = [
                transactions[0], transactions[3]
            ];

            expect(
                selectors.getPendingIncomesUntil(state)
            )
            .toEqual(expected);
        });

        it('until specified moment', () => {
            const expected = [
                transactions[0]
            ];

            expect(
                selectors.getPendingIncomesUntil(state, moment(new Date(2017, 0, 1)))
            )
            .toEqual(expected);
        });

    });
    
    it('getPendingExpensesUntil');
});