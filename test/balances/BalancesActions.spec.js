import React from 'react';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import sinon from 'sinon';
import moxios from 'moxios'
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import moment from 'moment';

import * as apiModule from './../../src/services/api';
import transactionReducer, { operations, types } from './../../src/balances/duck';

describe('Balances Actions', () => {
	
	let sandbox, axiosInstance;
	const middlewares = [ thunk ];
	const mockStore = configureMockStore(middlewares);
	let store;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();
		axiosInstance = apiModule.default();

		sandbox.stub(apiModule, 'default').returns(axiosInstance);
		moxios.install(axiosInstance);
		store = mockStore();
	})

	afterEach(() => {
		sandbox.restore();
		moxios.uninstall(axiosInstance);
	})

	describe('FETCH_BALANCE', () => {

		it('should dispatch success action after FETCH_BALANCE', (done) => {
			const expectedActions = [
				{ type: types.FETCH_BALANCE },
				{ type: types.FETCH_BALANCE, result: 'success', balance: 50 }
			]

			store.dispatch(operations.fetchBalance());

			moxios.wait(() => {
				let request = moxios.requests.mostRecent()

				request.respondWith({
					status: 200,
					response: { 'balance': 50 }

				}).then(() => {
					expect(store.getActions()).to.deep.equal(expectedActions);					
					done();
				})
				.catch((error) => done(error.message));
			});
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

			moxios.wait(() => {
				let request = moxios.requests.mostRecent()

				request.respondWith({
					status: 400,
					response: expectedResponse

				})
				.then((response) => {
					expect(store.getActions()).to.deep.equal(expectedActions);                    
					done();
				})
				.catch((error) => {
					done(`Actions arent equal: ${error}`);
				});
			});
		})		
    })
    
	describe('FETCH_REAL_BALANCE', () => {

		it('should dispatch success action after FETCH_REAL_BALANCE', (done) => {
			const expectedActions = [
				{ type: types.FETCH_REAL_BALANCE },
				{ type: types.FETCH_REAL_BALANCE, result: 'success', balance: 50 }
			]

			store.dispatch(operations.fetchRealBalance());

			moxios.wait(() => {
				let request = moxios.requests.mostRecent()

				request.respondWith({
					status: 200,
					response: { 'balance': 50 }

				}).then(() => {
					expect(store.getActions()).to.deep.equal(expectedActions);					
					done();
				})
				.catch((error) => done(error.message));
			});
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

			moxios.wait(() => {
				let request = moxios.requests.mostRecent()

				request.respondWith({
					status: 400,
					response: expectedResponse

				})
				.then((response) => {
					expect(store.getActions()).to.deep.equal(expectedActions);                    
					done();
				})
				.catch((error) => {
					done(`Actions arent equal: ${error}`);
				});
			});
		})		
	})
})