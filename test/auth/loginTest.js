import React from 'react';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
import moxios from 'moxios'
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';

import * as apiModule from './../../src/services/api';
import * as sessionModule from './../../src/services/session';
import LoginForm from './../../src/auth/components/LoginForm';
import { AUTH_FETCH_TOKEN, fetchToken } from './../../src/auth/actions';
import { loginReducer } from './../../src/auth/reducers';

describe('Login', () => {

    describe('LoginForm', () => {

        const assertSubmitDisabled = (wrapper) => {
            const submitButton = wrapper.find('button[type="submit"]');
            expect(submitButton.props()['disabled']).to.be.true;
        };

        const simulateChange = (input, name, value) => {
            input.simulate('change', { target: { name, value }});
        };
    
        it('renders ok', () => {
            const wrapper = shallow(<LoginForm />);
            expect(wrapper).to.be.ok;
        })

        it("submit button should be disabled when isFetching", () => {
            const wrapper = mount(<LoginForm isFetching={true} />);
            assertSubmitDisabled(wrapper);
        })

        it("submit button should be disabled if email is blank", () => {
            const wrapper = mount(<LoginForm />);
            const passwordInput = wrapper.find('#password');
            simulateChange(passwordInput, 'password', '123456');
            //Email still blank

            assertSubmitDisabled(wrapper);
        })

        it("submit button should be disabled if password is blank", () => {
            const wrapper = mount(<LoginForm />);
            const emailInput = wrapper.find('#emailaddress');
            simulateChange(emailInput, 'email', 'guilherme@latrova.com');
            //Password still blank

            assertSubmitDisabled(wrapper);
        })

        it("submit button should be enabled when everything filled", () => {
            const wrapper = mount(<LoginForm />);
            const passwordInput = wrapper.find('#password');
            const emailInput = wrapper.find('#emailaddress');
            simulateChange(emailInput, 'email', 'guilherme@latrova.com');
            simulateChange(passwordInput, 'password', '123456');

            const submitButton = wrapper.find('button[type="submit"]');
            expect(submitButton.props()['disabled']).to.be.false;
        })

        it('should display error when any', () => {
            const error = 'This general error was generated' ;
            const wrapper = shallow(<LoginForm error={error} />);            
            expect(wrapper.find('Alert')).to.have.length(1);
            expect(wrapper.contains(
                error
            )).to.be.true;
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
                { type: AUTH_FETCH_TOKEN },
                { type: AUTH_FETCH_TOKEN, result: 'success', token }
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

        it.skip('should dispatch finished with error when fetching token fails', (done) => {
            const expectedActions = [
                { type: AUTH_FETCH_TOKEN },
                { type: AUTH_FETCH_TOKEN, result: 'fail', error: '' }
            ]

            store.dispatch(fetchToken({ email:'any', password:'any' }));

            moxios.wait(() => {
                let request = moxios.requests.mostRecent()

                request.respondWith({
                    status: 400,
                    response: { detail: 'You shall not pass' }
                })
                .then(() => {
                    debugger;
                    expect(store.getActions()).to.deep.equal(expectedActions);
                    done();
                })
                .catch(() => {
                    expect(store.getActions()).to.deep.equal(expectedActions);
                    done();
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
                    type: AUTH_FETCH_TOKEN                    
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
                    type: AUTH_FETCH_TOKEN,
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
                    type: AUTH_FETCH_TOKEN,
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