import selectors from './selectors';

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

        it('should return all when visibleTransactions is empty', () => {
            const transactions = buildTransactionsUntil(2);
            const state = buildState({
                transactions,
                visibleTransactions: []
            });

            expect(
                selectors.getTransactionsToDisplay(state)
            )
            .to.deep.equal(transactions);
        });        

    })
    
});