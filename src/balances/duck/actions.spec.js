import operations from './operations';
import types from './types';
import * as apiModule from '../../services/api';

describe('balances/duck/actions', () => {
    
    const testHelper = new ActionsTestHelper();
	let store;

    beforeEach(() => {
        testHelper.mock(apiModule);
        store = testHelper.createStore();
    })
    
    afterEach(() => {
        testHelper.clearMock();
    })

	describe('FETCH_BALANCE', () => {

		it('should dispatch success action after successful request', (done) => {
			const expectedActions = [
				{ type: types.FETCH_BALANCE, key: 'balance' },
				{ type: types.FETCH_BALANCE, key: 'balance', result: 'success', balance: 50 }
			]

			store.dispatch(operations.fetchBalance());

            testHelper.apiRespondsWith({
                status: 200,
                response: { 'balance': 50 }
            })
            .expectActionsAsync(done, expectedActions);
		});

		it('should dispatch fail action after failed request', (done) => {
			const expectedResponse = {
				detail: 'invalid token',
			}
			const expectedActions = [
				{ type: types.FETCH_BALANCE, key: 'balance' },
				{ type: types.FETCH_BALANCE, key: 'balance', result: 'fail', errors: expectedResponse }
			]

            store.dispatch(operations.fetchBalance());
            
            testHelper.apiRespondsWith({
                status: 400,
                response: expectedResponse
            })
            .expectActionsAsync(done, expectedActions);			
		})		
    })
    
})