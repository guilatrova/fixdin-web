import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import moxios from 'moxios';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import * as apiModule from './../../src/services/api';
import SignupForm from './../../src/auth/components/SignupForm';
import { signupReducer } from './../../src/auth/reducers';
import { SIGNUP, fetchSignup } from './../../src/auth/actions';

describe('Signup', () => {

    describe('Actions', () => {
        let sandbox, axiosInstance;
        const middlewares = [ thunk ];
        const mockStore = configureMockStore(middlewares);
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

        it('should dispatch actions before and after signup when successful', (done) => {
            const user = { id: 2 };
            const expectedActions = [
                { type: SIGNUP },
                { type: SIGNUP, result: 'success', user }
            ]

            store.dispatch(fetchSignup({}));

            moxios.wait(() => {
                let request = moxios.requests.mostRecent()

                request.respondWith({
                    status: 200,
                    response: user
                })
                .then(() => {                    
                    expect(store.getActions()).to.deep.equal(expectedActions);
                    done();
                })
                .catch((error) => done(error.message));                
            });            
        })

        it('should dispatch finished with error when signup fails', (done) => {
            const errors = { email: 'You shall not pass'}
            const expectedActions = [
                { type: SIGNUP },
                { type: SIGNUP, result: 'fail', errors }
            ]

            store.dispatch(fetchSignup({}));

            moxios.wait(() => {
                let request = moxios.requests.mostRecent()

                request.respondWith({
                    status: 400,
                    response: errors
                })
                .then(() => {
                    debugger;
                    expect(store.getActions()).to.deep.equal(expectedActions);
                    done();
                })
                .catch(error => {
                    done(`Actions arent equal: ${error}`);
                });
            });
        })

    })


    describe('Reducers', () => {
        const initialState = {
            isFetching: false,
            errors: {}
        }

        it('should return the initial state', () => {
            expect(
                signupReducer(undefined, {})
            ).to.deep.equal(initialState);
        })

        it('should handle SIGNUP', () => {
            expect(
                signupReducer(undefined, {
                    type: SIGNUP                    
                })
            ).to.deep.equal({
                isFetching: true,
                errors: {}
            });
        })

        it('should handle successful SIGNUP', () => {
            expect(
                signupReducer(undefined, {
                    type: SIGNUP,
                    result: 'success'
                })
            ).to.deep.equal({
                isFetching: false,
                errors: {}
            });
        })

        it('should handle failed SIGNUP', () => {
            const errors = {
                email: 'invalid address',
                password: 'too short'
            }

            expect(
                signupReducer(undefined, {
                    type: SIGNUP,
                    result: 'fail',
                    errors
                })
            ).to.deep.equal({
                isFetching: false,                
                errors
            });
        })
    })

})