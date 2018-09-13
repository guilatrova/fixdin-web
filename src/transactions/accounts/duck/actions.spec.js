import operations from './operations';
import types from './types';

describe('accounts/duck/actions', () => {
    // let store, mock, restoreMock;
    const { itShouldDispatchSuccessFailActions, itShouldDispatchSuccessFailActionsCustom } = actionsHelpers;

    beforeEach(() => {
        // const mockHelper = mockAxios();
        // mock = mockHelper.mock;
        // store = mockHelper.store;
        // restoreMock = mockHelper.restoreMock;
    });

    afterEach(() => {
        // restoreMock();
    });

    describe('FETCH_ACCOUNTS', () => {
        itShouldDispatchSuccessFailActions(
            operations.fetchAccounts,
            types.FETCH_ACCOUNTS,
            'accounts',
            [{ id: 1, name: 'acc' }, { id: 2, name: 'acc2' }]
        );
    });

    describe('SAVE_ACCOUNT', () => {
        itShouldDispatchSuccessFailActions(
            operations.saveAccount,
            types.SAVE_ACCOUNT,
            'account',
            { name: 'acc' }
        );
    });

    describe('ARCHIVE_ACCOUNT', () => {
        itShouldDispatchSuccessFailActions(
            operations.archiveAccount,
            types.ARCHIVE_ACCOUNT,
            'account',
            {}
        );
    });

    describe('FETCH_TRANSFERS', () => {
        itShouldDispatchSuccessFailActions(
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

        itShouldDispatchSuccessFailActionsCustom(
            () => operations.deleteTransfer(id),
            types.DELETE_TRANSFER,
            { id },
            { id }
        );
    });

});
