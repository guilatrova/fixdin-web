import operations from './operations';
import types from './types';

describe('balances/duck/actions', () => {    
    const { itShouldDispatchSuccessFailActions, itShouldDispatchSuccessFailActionsCustom } = actionsHelpers;

    describe('FETCH_PLAIN_BALANCE', () => {
        const options = {
            based: 'real',
            output: 'expenses'
        };
        itShouldDispatchSuccessFailActionsCustom(
            () => operations.fetchPlainBalance(options),
            types.FETCH_PLAIN_BALANCE,
            null,
            { balance: 100, ...options },
            null,
            { balance: 100 }
        );
    });

    describe('FETCH_DETAILED_ACCOUNTS_BALANCE', () => {
        const result = [ 
            { account: 1, incomes: 100, expenses: -200, total: -100 }, 
            { account: 2, incomes: 400, expenses: -300, total: 100 } 
        ];
        itShouldDispatchSuccessFailActions(
            operations.fetchDetailedAccountsBalance,
            types.FETCH_DETAILED_ACCOUNTS_BALANCE,
            'balances',
            result
        );
    });
    
});