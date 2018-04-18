import operations from './operations';
import types from './types';

describe('balances/duck/actions', () => {    
    const { itShouldDispatchSuccessFailActions, itShouldDispatchSuccessFailActionsCustom } = actionsHelpers;

    describe('FETCH_PENDING_INCOMES_BALANCES', () => {
        itShouldDispatchSuccessFailActionsCustom(
            operations.fetchPendingIncomesBalance,
            types.FETCH_PENDING_INCOMES_BALANCES,
            null,            
            { balance: 100 },
            null,
            { balance: 100 }
        );
    });

    describe('FETCH_PENDING_EXPENSES_BALANCES', () => {
        itShouldDispatchSuccessFailActionsCustom(
            operations.fetchPendingExpensesBalance,
            types.FETCH_PENDING_EXPENSES_BALANCES,
            null,            
            { balance: 100 },
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

    describe('FETCH_DETAILED_ACCUMULATED_BALANCE', () => {
        const result = {
            expenses: -100,
            incomes: 200,
            total: 100
        };
        itShouldDispatchSuccessFailActions(
            operations.fetchDetailedAccumulatedBalance,
            types.FETCH_DETAILED_ACCUMULATED_BALANCE,
            'balance',
            result
        );
    });
    
});