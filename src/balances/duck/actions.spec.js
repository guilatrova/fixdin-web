import operations from './operations';
import types from './types';

describe('balances/duck/actions', () => {
    
    const testHelper = new ActionsTestHelper();
	let store;

    beforeEach(() => {
        testHelper.mock();
        store = testHelper.createStore();
    })
    
    afterEach(() => {
        testHelper.clearMock();
    })

	describe('FETCH_BALANCE', () => {

		it('should dispatch success action after FETCH_BALANCE', (done) => {
			const expectedActions = [
				{ type: types.FETCH_BALANCE },
				{ type: types.FETCH_BALANCE, result: 'success', balance: 50 }
			]

			store.dispatch(operations.fetchBalance());

            testHelper.apiRespondsWith({
                status: 200,
                response: { 'balance': 50 }
            })
            .expectActionsAsync(done, expectedActions);
		});

		it('should dispatch fail action after FETCH_BALANCE when something goes wrong', (done) => {
			const expectedResponse = {
				detail: 'invalid token',
			}
			const expectedActions = [
				{ type: types.FETCH_BALANCE },
				{ type: types.FETCH_BALANCE, result: 'fail', errors: expectedResponse }
			]

            store.dispatch(operations.fetchBalance());
            
            testHelper.apiRespondsWith({
                status: 400,
                response: expectedResponse
            })
            .expectActionsAsync(done, expectedActions);			
		})		
    })
    
	describe('FETCH_REAL_BALANCE', () => {

		it('should dispatch success action after FETCH_REAL_BALANCE', (done) => {
			const expectedActions = [
				{ type: types.FETCH_REAL_BALANCE },
				{ type: types.FETCH_REAL_BALANCE, result: 'success', balance: 50 }
			]

			store.dispatch(operations.fetchRealBalance());

            testHelper.apiRespondsWith({
                status: 200,
                response: { 'balance': 50 }
            })
            .expectActionsAsync(done, expectedActions);            
		});

		it('should dispatch fail action after FETCH_REAL_BALANCE when something goes wrong', (done) => {
			const expectedResponse = {
				detail: 'invalid token',
			}
			const expectedActions = [
				{ type: types.FETCH_REAL_BALANCE },
				{ type: types.FETCH_REAL_BALANCE, result: 'fail', errors: expectedResponse }
			]

			store.dispatch(operations.fetchRealBalance());

            testHelper.apiRespondsWith({
                status: 400,
                response: expectedResponse
            })
            .expectActionsAsync(done, expectedActions);
		})		
	})
})