import * as sessionModule from '../../services/session';
import operations from './operations';
import types from './types';

describe('users/duck/actions', () => {
    const token = 'abc123456';
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
    
    describe('login', () => {
        it('should call save token when login request is successful', () => {
            let expectedResponse = { token };
            let sessionSpy = jest.spyOn(sessionModule, 'saveToken');
            
            mock.onPost().reply(200, expectedResponse);

            return store.dispatch(operations.fetchToken({ email:'any', password:'any' })).then(() => {
                expect(sessionSpy).toHaveBeenCalledWith(expectedResponse.token);
                sessionSpy.mockRestore(); 
            });
        });
        
        it('should dispatch actions before and after fetching token when successful', () => {
            const expectedActions = [
                { type: types.FETCH_TOKEN },
                { type: types.FETCH_TOKEN, result: 'success', token }
            ];

            mock.onPost().reply(200, {token});
            
            return store.dispatch(operations.fetchToken({ email:'any', password:'any' })).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
        
        it('should dispatch finished with error when fetching token fails', () => {
            const expectedActions = [
                { type: types.FETCH_TOKEN },
                { type: types.FETCH_TOKEN, result: 'fail', error: 'You shall not pass' }
            ];
            const response = { detail: 'You shall not pass' };

            mock.onPost().reply(400, response);
            
            return store.dispatch(operations.fetchToken({ email:'any', password:'any' })).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });

    describe('signup', () => {

        it('should dispatch actions before and after signup when successful', () => {
            const user = { id: 2 };
            const expectedActions = [
                { type: types.SIGNUP },
                { type: types.SIGNUP, result: 'success', user }
            ];

            mock.onPost().reply(200, user);

            return store.dispatch(operations.requestSignup({})).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('should dispatch finished with error when signup fails', () => {
            const errors = { email: 'You shall not pass' };
            const expectedActions = [
                { type: types.SIGNUP },
                { type: types.SIGNUP, result: 'fail', errors }
            ];

            mock.onPost().reply(400, errors);

            return store.dispatch(operations.requestSignup({})).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

    });
    
});