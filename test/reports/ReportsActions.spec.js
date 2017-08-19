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
import { operations, types } from './../../src/reports/duck';

describe('Reports Actions', () => {
	
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

	describe('FETCH_LAST_13_MONTHS', () => {

		it('should dispatch success action after FETCH_LAST_13_MONTHS', (done) => {
            const data = [ { id: 1 }, { id: 2 } ];
			const expectedActions = [
				{ type: types.FETCH_LAST_13_MONTHS },
				{ type: types.FETCH_LAST_13_MONTHS, result: 'success', data }
			]

			store.dispatch(operations.fetchLast13MonthsReport());

			moxios.wait(() => {
				let request = moxios.requests.mostRecent()

				request.respondWith({
					status: 200,
					response: data

				}).then(() => {
					expect(store.getActions()).to.deep.equal(expectedActions);					
					done();
				})
				.catch((error) => done(error.message));
			});
		});

		it('should dispatch fail action after FETCH_LAST_13_MONTHS when something goes wrong', (done) => {
			const expectedResponse = {
				detail: 'data unavailable',
			}
			const expectedActions = [
				{ type: types.FETCH_LAST_13_MONTHS },
				{ type: types.FETCH_LAST_13_MONTHS, result: 'fail', errors: expectedResponse }
			]

			store.dispatch(operations.fetchLast13MonthsReport());

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