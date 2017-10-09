import selectors from './selectors';
import { INCOME, EXPENSE } from '../../kinds';

describe('transactions/duck/selectors', () => {
    const buildState = (state) => {
        return {
            transactions: state
        }
    }

    const buildTransactionsUntil = (length) => {
        const transactions = []
        for (let i = 0; i < length; i++) {
            transactions[i] = { id: i+1 };
        }
        return transactions
    }

    it('getErrors', () => {
        const state = buildState({
            errors: 'errors'
        });

        expect(
            selectors.getErrors(state)
        )
        .to.deep.equal('errors');
    });

    it('getEditingTransaction', () => {
        const editingTransaction = { id: 5 }
        const state = buildState({
            editingTransaction
        });

        expect(
            selectors.getEditingTransaction(state)
        )
        .to.equal(editingTransaction);
    })

    it('isFetching', () => {
        const state = buildState({
            isFetching: true
        });

        expect(
            selectors.isFetching(state)
        )
        .to.be.true;
    });

    describe('getTransactionsToDisplay', () => {
        
        it('should return visibleTransactions', () => {        
            const visibleTransactions = buildTransactionsUntil(3);
            const transactions = buildTransactionsUntil(5);
            const state = buildState({
                transactions,
                visibleTransactions
            });

            expect(
                selectors.getTransactionsToDisplay(state)
            )
            .to.deep.equal(visibleTransactions);
        })

        it('should return all when visibleTransactions is undefined', () => {
            const transactions = buildTransactionsUntil(2);
            const state = buildState({
                transactions,
                visibleTransactions: undefined
            });

            expect(
                selectors.getTransactionsToDisplay(state)
            )
            .to.deep.equal(transactions);
        });        

    });

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
            ]

            expect(
                selectors.getPendingIncomesUntil(state)
            )
            .to.deep.equal(expected);
        });

        it('until specified moment', () => {
            const expected = [
                transactions[0]
            ]

            expect(
                selectors.getPendingIncomesUntil(state, moment(new Date(2017, 0, 1)))
            )
            .to.deep.equal(expected);
        });

    });
    
});