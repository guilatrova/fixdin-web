import operations from './operations';
import types from './types';

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import * as apiModule from '../../services/api';

describe('balances/duck/actions', () => {    
	let store, axiosInstance, mock;

    beforeEach(() => {
        axiosInstance = apiModule.default();
        apiModule.default = jest.fn();
        apiModule.default.mockReturnValue(axiosInstance);

        const middlewares = [ thunk ];
        const mockStore = configureMockStore(middlewares);

        store = mockStore();
        mock = new MockAdapter(axiosInstance);
    });
    
    afterEach(() => {
        apiModule.default.mockRestore();
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
    
});