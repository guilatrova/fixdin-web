import operations from './operations';
import types from './types';

describe('balances/duck/actions', () => {    
    let store, mock, restoreMock;
    const { itShouldDispatchSuccessFailActionsCustom } = actionsHelpers;

    beforeEach(() => {
        const mockHelper = mockAxios();
        mock = mockHelper.mock;
        store = mockHelper.store;
        restoreMock = mockHelper.restoreMock;
    });
    
    afterEach(() => {
        restoreMock();
    });

	describe('FETCH_BALANCE', () => {
		it('should dispatch success action after successful request', () => {
			const expectedActions = [
				{ type: types.FETCH_BALANCE, key: 'balance' },
				{ type: types.FETCH_BALANCE, key: 'balance', result: 'success', balance: 50 }
			];

            mock.onGet().reply(200, { 'balance': 50 });

            return store.dispatch(operations.fetchBalance()).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
		});

		it('should dispatch fail action after failed request', () => {
			const expectedResponse = {
				detail: 'invalid token',
			};
			const expectedActions = [
				{ type: types.FETCH_BALANCE, key: 'balance' },
				{ type: types.FETCH_BALANCE, key: 'balance', result: 'fail', errors: expectedResponse }
			];

            mock.onGet().reply(400, expectedResponse);

            return store.dispatch(operations.fetchBalance()).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
		});
    });

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
    
});