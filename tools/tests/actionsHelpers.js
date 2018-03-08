const itShouldDispatchSuccessFailActions = (operation, type, succeedKey, succeedItem) => {
    itShouldDispatchSuccessFailActionsCustom(
        operation,
        type,
        null,
        { [succeedKey]: succeedItem },
        null,
        succeedItem
    );
};

const itShouldDispatchSuccessFailActionsCustom = (operation, type, requestAction, succeedAction, failAction, returnSucceed) => {
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

export default {
    itShouldDispatchSuccessFailActions,
    itShouldDispatchSuccessFailActionsCustom
};