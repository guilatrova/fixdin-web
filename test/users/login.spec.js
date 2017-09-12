import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
import moxios from 'moxios';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';

import * as apiModule from './../../src/services/api';
import * as sessionModule from './../../src/services/session';
import LoginForm from './../../src/users/components/LoginForm';
import  loginReducer, { operations, types } from './../../src/users/duck';
import { ActionsTestHelper } from './../reduxTestHelpers';
import { 
    itShouldDisplayErrorForField, 
    itSubmitButtonShouldBeDisabledWhenFieldIsBlank,
    fillAllRequiredFields 
} from './../testHelpers';

sinonStubPromise(sinon);

xdescribe('Login', () => {

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
        let sandbox, axiosInstance;
        const middlewares = [ thunk ];
        const mockStore = configureMockStore(middlewares);
        const token = 'abc123456';
        let store;

        beforeEach(() => {
            sandbox = sinon.sandbox.create();
            axiosInstance = apiModule.default();

            sandbox.stub(apiModule, 'default').returns(axiosInstance);
            moxios.install(axiosInstance);
            store =  mockStore();
        })

        afterEach(() => {
            sandbox.restore();
            moxios.uninstall(axiosInstance);
        })

        it('should call save token when login request is successful', (done) => {
            let expectedResponse = { token };
            let sessionSpy = sinon.spy(sessionModule, 'saveToken');
            
            store.dispatch(fetchToken({ email:'any', password:'any' }));

            moxios.wait(() => {
                let request = moxios.requests.mostRecent()

                request.respondWith({
                    status: 200,
                    response: expectedResponse

                }).then(() => {
                    expect(sessionSpy.calledWith(expectedResponse.token)).to.be.true;
                    done();
                })
                .catch((error) => done(error.message));
            });
        })

        it('should dispatch actions before and after fetching token when successful', (done) => {
            const expectedActions = [
                { type: FETCH_TOKEN },
                { type: FETCH_TOKEN, result: 'success', token }
            ]

            store.dispatch(fetchToken({ email:'any', password:'any' }));                

            moxios.wait(() => {
                let request = moxios.requests.mostRecent()

                request.respondWith({
                    status: 200,
                    response: { token }
                })
                .then(() => {
                    expect(store.getActions()).to.deep.equal(expectedActions);
                    done();
                })
                .catch((error) => done(error.message));                
            });            
        })

        it('should dispatch finished with error when fetching token fails', (done) => {
            const expectedActions = [
                { type: FETCH_TOKEN },
                { type: FETCH_TOKEN, result: 'fail', error: 'You shall not pass' }
            ]

            store.dispatch(fetchToken({ email:'any', password:'any' }));

            moxios.wait(() => {
                let request = moxios.requests.mostRecent()

                request.respondWith({
                    status: 400,
                    response: { detail: 'You shall not pass' }
                })
                .then(() => {
                    expect(store.getActions()).to.deep.equal(expectedActions);
                    done();
                })
                .catch(error => {
                    done(`Actions arent equal: ${error}`);
                });
            });
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
                loginReducer(undefined, {})
            ).to.deep.equal(initialState);
        })

        it('should handle FETCH_TOKEN', () => {
            expect(
                loginReducer(undefined, {
                    type: FETCH_TOKEN                    
                })
            ).to.deep.equal({                
                isFetching: true,
                error: '',
                token: ''
            })
        })

        it('should handle successful FETCH_TOKEN', () => {
            expect(
                loginReducer(undefined, {
                    type: FETCH_TOKEN,
                    result: 'success',
                    token: 'abc123'
                })
            ).to.deep.equal({
                isFetching: false,
                error: '',
                token: 'abc123'
            });
        })

        it('should handle failed FETCH_TOKEN', () => {
            expect(
                loginReducer(undefined, {
                    type: FETCH_TOKEN,
                    result: 'fail',
                    error: 'General error'
                })
            ).to.deep.equal({
                isFetching: false,
                error: 'General error',
                token: ''
            });
        })

    });

});