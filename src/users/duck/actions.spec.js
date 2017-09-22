import * as sessionModule from '../../services/session';
import operations from './operations';
import types from './types';
import * as apiModule from '../../services/api';

describe('users/duck/actions', () => {
    
    const testHelper = new ActionsTestHelper();
    const token = 'abc123456';
    let store;
    
    beforeEach(() => {
        testHelper.mock(apiModule);
        store = testHelper.createStore();
    })
    
    afterEach(() => {
        testHelper.clearMock();
    })
    
    describe('login', () => {
        it('should call save token when login request is successful', (done) => {
            let expectedResponse = { token };
            let sessionSpy = sinon.spy(sessionModule, 'saveToken');
            
            store.dispatch(operations.fetchToken({ email:'any', password:'any' }));
            
            testHelper.apiRespondsWith({
                status: 200,
                response: expectedResponse
            })
            .expectAsync(done, () => {
                expect(sessionSpy.calledWith(expectedResponse.token)).to.be.true;
            });
        })
        
        it('should dispatch actions before and after fetching token when successful', (done) => {
            const expectedActions = [
                { type: types.FETCH_TOKEN },
                { type: types.FETCH_TOKEN, result: 'success', token }
            ]
            
            store.dispatch(operations.fetchToken({ email:'any', password:'any' }));
            
            testHelper.apiRespondsWith({
                status: 200,
                response: { token }
            })
            .expectActionsAsync(done, expectedActions);
        })
        
        it('should dispatch finished with error when fetching token fails', (done) => {
            const expectedActions = [
                { type: types.FETCH_TOKEN },
                { type: types.FETCH_TOKEN, result: 'fail', error: 'You shall not pass' }
            ]
            
            store.dispatch(operations.fetchToken({ email:'any', password:'any' }));
            
            testHelper.apiRespondsWith({
                status: 400,
                response: { detail: 'You shall not pass' }
            })
            .expectActionsAsync(done, expectedActions);
        })
    })

    describe('signup', () => {

        it('should dispatch actions before and after signup when successful', (done) => {
            const user = { id: 2 };
            const expectedActions = [
                { type: types.SIGNUP },
                { type: types.SIGNUP, result: 'success', user }
            ]

            store.dispatch(operations.requestSignup({}));

            testHelper.apiRespondsWith({
                status: 200,
                response: user
            })
            .expectActionsAsync(done, expectedActions);
        })

        it('should dispatch finished with error when signup fails', (done) => {
            const errors = { email: 'You shall not pass'}
            const expectedActions = [
                { type: types.SIGNUP },
                { type: types.SIGNUP, result: 'fail', errors }
            ]

            store.dispatch(operations.requestSignup({}));

            testHelper.apiRespondsWith({
                status: 400,
                response: errors
            })
            .expectActionsAsync(done, expectedActions);
        })

    })
    
});