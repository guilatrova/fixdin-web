import operations from './operations';
import types from './types';

describe('accounts/duck/actions', () => {
	let store, mock, restoreMock;

	beforeEach(() => {
		const mockHelper = mockAxios();
		mock = mockHelper.mock;
		store = mockHelper.store;
		restoreMock = mockHelper.restoreMock;
	});

	afterEach(() => {
		restoreMock();
    });

    const itActionShouldDispatchSuccessFailActions = (operation, type, succeedKey, succeedItem) => {
        itActionShouldDispatchSuccessFailActionsCustom(
            operation,
            type,
            null,
            { [succeedKey]: succeedItem },
            null,
            succeedItem
        );
    };

    const itActionShouldDispatchSuccessFailActionsCustom = (operation, type, requestAction, succeedAction, failAction, returnSucceed) => {
        it('should dispatch success action', () => {
            const expectedActions = [
                { type, ...requestAction },
                { type, result: 'success', ...succeedAction }
            ];

            mock.onAny().reply(200, returnSucceed);

            return store.dispatch(operation()).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('should dispatch fail action when something goes wrong', () => {
            const errors = { detail: 'internal error' };
            const expectedActions = [
                { type, ...requestAction },
                { type, result: 'fail', errors, ...failAction }
            ];

            mock.onAny().reply(500, errors);

            return store.dispatch(operation()).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    };
    
    describe('FETCH_ACCOUNTS', () => {
        itActionShouldDispatchSuccessFailActions(
            operations.fetchAccounts,
            types.FETCH_ACCOUNTS,
            'accounts',
            [ { id: 1, name: 'acc' }, { id: 2, name: 'acc2' } ]
        );
    });

    describe('SAVE_ACCOUNT', () => {
        itActionShouldDispatchSuccessFailActions(
            operations.saveAccount,
            types.SAVE_ACCOUNT,
            'account',
            { name: 'acc' }
        );
    });

    describe('FETCH_TRANSFERS', () => {
        itActionShouldDispatchSuccessFailActions(
            operations.fetchTransfers,
            types.FETCH_TRANSFERS,
            'transfers',
            [{ value: 10 }, { value: 20 }]
        );
    });

    xdescribe('SAVE_TRANSFER', () => {
        describe('when successfull');

        it('when failed', () => {

        });
    });

    describe('DELETE_TRANSFER', () => {
        const id = 1;
        
        itActionShouldDispatchSuccessFailActionsCustom(
            () => operations.deleteTransfer(id),
            types.DELETE_TRANSFER,
            { id },
            { id }
        );
    });

});