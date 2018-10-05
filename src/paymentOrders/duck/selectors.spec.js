import selectors from './selectors';

describe('paymentOrders/duck/selectors', () => {

    describe('getCheckedByAccount', () => {
        const createTransaction = (id, account, value) => ({ id, account, value });
        const createState = (transactions, checked) => ({ transactions: { transactions }, paymentOrders: { checked } });

        it('returns values aggregated by account', () => {
            const transactions = [
                createTransaction(1, 1, 10),
                createTransaction(2, 1, 20),
                createTransaction(3, 2, 50)
            ];
            const checked = [1, 2, 3];
            const state = createState(transactions, checked);

            const expected = [];
            expected[1] = 30;
            expected[2] = 50;

            expect(selectors.getCheckedByAccount(state)).toEqual(expected);
        });

        it('returns empty when nothing checked', () => {
            const transactions = [
                createTransaction(1, 1, 10),
                createTransaction(2, 1, 20),
                createTransaction(3, 2, 50)
            ];
            const checked = [];
            const state = createState(transactions, checked);

            expect(selectors.getCheckedByAccount(state)).toEqual([]);
        });
    });

});
