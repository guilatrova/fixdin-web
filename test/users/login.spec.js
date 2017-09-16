import React from 'react';
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import * as sessionModule from './../../src/services/session';
import LoginForm from './../../src/users/components/LoginForm';
import  reducer, { operations, types } from './../../src/users/duck';
import  actions from './../../src/users/duck/actions';
import { ActionsTestHelper } from './../reduxTestHelpers';
import { 
    itShouldDisplayErrorForField, 
    itSubmitButtonShouldBeDisabledWhenFieldIsBlank,
    fillAllRequiredFields 
} from './../testHelpers';

sinonStubPromise(sinon);

describe('Login', () => {

    describe('LoginForm', () => {

        const requiredFields = ["email", "password"];
        const triggerReference = 'FormControl[name="password"]';
    
        it('renders ok', () => {
            const wrapper = shallow(<LoginForm />);
            expect(wrapper).to.be.ok;
        })        

        itSubmitButtonShouldBeDisabledWhenFieldIsBlank(shallow(<LoginForm />), triggerReference, requiredFields, 'email');
        itSubmitButtonShouldBeDisabledWhenFieldIsBlank(shallow(<LoginForm />), triggerReference, requiredFields, 'password');        

        it("submit button should be disabled when isFetching", () => {
            const wrapper = shallow(<LoginForm isFetching={true} />);
            expect(wrapper.find('Button[type="submit"]').prop('disabled')).to.be.true;
        })

        it("submit button should be enabled when everything filled", () => {
            const wrapper = shallow(<LoginForm />);
            const input = wrapper.find(triggerReference);

            fillAllRequiredFields(input, requiredFields);
            
            expect(wrapper.find('Button[type="submit"]').prop('disabled')).to.be.false;
        })

        it('should display error when any', () => {
            const error = 'This general error was generated' ;
            const wrapper = shallow(<LoginForm error={error} />);            
            expect(wrapper.find('Alert')).to.have.length(1);
            expect(wrapper.contains(
                error
            )).to.be.true;
        })

        it('should calls onSubmit', () => {            
            let submitPromise = sinon.stub().returnsPromise();
            submitPromise.resolves({ result: 'success '});

            const wrapper = mount(<LoginForm onSubmit={submitPromise} />);
            wrapper.find('form').simulate('submit');

            expect(submitPromise.called).to.be.true;
        })
    });

    describe('Actions', () => {
        const testHelper = new ActionsTestHelper();
        const token = 'abc123456';
        let store;

        beforeEach(() => {
            testHelper.mock();
            store = testHelper.createStore();
        })

        afterEach(() => {
            testHelper.clearMock();
        })

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

    });

    describe('Reducers', () => {
        const initialState = {
                isFetching: false,
                error: '',
                token: ''
            };

        it('should return the initial state', () => {
            expect(
                reducer(undefined, {}).login
            ).to.deep.equal(initialState);
        })

        it('should handle FETCH_TOKEN', () => {
            expect(
                reducer(undefined, actions.requestToken({})).login
            ).to.deep.equal({                
                isFetching: true,
                error: '',
                token: ''
            })
        })

        it('should handle successful FETCH_TOKEN', () => {
            expect(
                reducer(undefined, actions.receiveToken('success', 'abc123')).login
            )
            .to.deep.equal({
                isFetching: false,
                error: '',
                token: 'abc123'
            });
        })

        it('should handle failed FETCH_TOKEN', () => {
            expect(
                reducer(undefined, actions.receiveToken('fail', 'General error')).login
            ).to.deep.equal({
                isFetching: false,
                error: 'General error',
                token: ''
            });
        })

    });

});