import operations from './operations';
import types from './types';

describe('reports/duck/actions', () => {
	
	const testHelper = new ActionsTestHelper();
	let store;

	beforeEach(() => {
		testHelper.mock();
		store = testHelper.createStore();
	})

	afterEach(() => {
		testHelper.clearMock();
	})

	describe('FETCH_LAST_13_MONTHS', () => {

		it('should dispatch success action after FETCH_LAST_13_MONTHS', (done) => {
            const data = [ { id: 1 }, { id: 2 } ];
			const expectedActions = [
				{ type: types.FETCH_LAST_13_MONTHS, real: undefined },
				{ type: types.FETCH_LAST_13_MONTHS, real: false, result: 'success', data }
			]

			store.dispatch(operations.fetchLast13MonthsReport());

			testHelper.apiRespondsWith({
				status: 200,
				response: data
			})
			.expectActionsAsync(done, expectedActions);
		})

		it('should dispatch fail action after FETCH_LAST_13_MONTHS when something goes wrong', (done) => {
			const expectedResponse = {
				detail: 'data unavailable',
			}
			const expectedActions = [
				{ type: types.FETCH_LAST_13_MONTHS, real: undefined },
				{ type: types.FETCH_LAST_13_MONTHS, result: 'fail', errors: expectedResponse }
			]

			store.dispatch(operations.fetchLast13MonthsReport());

			testHelper.apiRespondsWith({
				status: 400,
				response: expectedResponse
			})
			.expectActionsAsync(done, expectedActions);
		})
	})
	
	xdescribe('FETCH_PENDING_TRANSACTIONS', () => {
		
		it('should dispatch success action after FETCH_PENDING_TRANSACTIONS', (done) => {
			
		})

		it('should dispatch fail action after FETCH_PENDING_TRANSACTIONS when something goes wrong', (done) => {

		})
	})

	xdescribe('FETCH_VALUES_BY_CATEGORY', () => {
		
		it('should dispatch success action after FETCH_VALUES_BY_CATEGORY', (done) => {
			
		})

		it('should dispatch fail action after FETCH_VALUES_BY_CATEGORY when something goes wrong', (done) => {

		})

	})
    
})