import operations from './operations';
import types from './types';
import { EXPENSE, INCOME } from '../../transactions/kinds';

describe('reports/duck/actions', () => {
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

	describe('FETCH_LAST_MONTHS', () => {

		it('should dispatch success action after successful request', () => {
            const data = [ { id: 1 }, { id: 2 } ];
			const expectedActions = [
				{ type: types.FETCH_LAST_MONTHS },
				{ type: types.FETCH_LAST_MONTHS, result: 'success', data }
			];

			mock.onGet().reply(200, data);

			return store.dispatch(operations.fetchLastMonthsReport()).then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		});

		it('should dispatch fail action after failed request', () => {
			const expectedResponse = {
				detail: 'data unavailable',
			};
			const expectedActions = [
				{ type: types.FETCH_LAST_MONTHS },
				{ type: types.FETCH_LAST_MONTHS, result: 'fail', errors: expectedResponse }
			];

			mock.onGet().reply(400, expectedResponse);

			return store.dispatch(operations.fetchLastMonthsReport()).then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		});
	});
	
	describe('FETCH_PENDING_TRANSACTIONS', () => {
		
		it('should dispatch success action after successful request', () => {
			const data = [
				{ id: 1 },
				{ id: 2 }
			];
			const expectedActions = [
				{ type: types.FETCH_PENDING_TRANSACTIONS, kind: EXPENSE },
				{ type: types.FETCH_PENDING_TRANSACTIONS, result: 'success', data, kind: EXPENSE }
			];

			mock.onGet().reply(200, data);

			return store.dispatch(operations.fetchPendingTransactionsReport(EXPENSE)).then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		});

		it('should dispatch fail action after failed request', () => {
			const errors = {
				detail: 'random error'
			};
			const expectedActions = [
				{ type: types.FETCH_PENDING_TRANSACTIONS, kind: INCOME },
				{ type: types.FETCH_PENDING_TRANSACTIONS, result: 'fail', errors, kind: INCOME }
			];

			mock.onGet().reply(400, errors);

			return store.dispatch(operations.fetchPendingTransactionsReport(INCOME)).then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		});
	});

	describe('FETCH_VALUES_BY_CATEGORY', () => {
		
		it('should dispatch success action after successful request', () => {
			const data = [
				{ id: 1 },
				{ id: 2 }
			];
			const expectedActions = [
				{ type: types.FETCH_VALUES_BY_CATEGORY, kind: EXPENSE },
				{ type: types.FETCH_VALUES_BY_CATEGORY, result: 'success', data, kind: EXPENSE }
			];

			mock.onGet().reply(200, data);

			return store.dispatch(operations.fetchValuesByCategoryReport(EXPENSE)).then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		});

		it('should dispatch fail action after failed request', () => {
			const errors = [
				{ id: 1 },
				{ id: 2 }
			];
			const expectedActions = [
				{ type: types.FETCH_VALUES_BY_CATEGORY, kind: EXPENSE },
				{ type: types.FETCH_VALUES_BY_CATEGORY, result: 'fail', errors, kind: EXPENSE }
			];

			mock.onGet().reply(400, errors);

			return store.dispatch(operations.fetchValuesByCategoryReport(EXPENSE)).then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		});

	});
    
});