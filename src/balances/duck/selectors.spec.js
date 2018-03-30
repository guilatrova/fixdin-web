import selectors from './selectors';

describe('balances/duck/selectors', () => {
    const state = {
        balances: {
            detailedAccounts: [
                { account: 1, incomes: 200, expenses: -300, total: -100 },
                { account: 2, incomes: 500, expenses: -50, total: 450 }
            ]
        }
    };

    it('getTotalsDetailedAccounts', () => {        
        expect(selectors.getTotalsDetailedAccounts(state)).toEqual({
            incomes: 700,
            expenses: -350,
            total: 350
        });
    });
});