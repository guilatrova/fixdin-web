import React from 'react';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import sinon from 'sinon';
import moxios from 'moxios'
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import * as apiModule from './../../src/services/api';
import { EXPENSE, INCOME } from './../../src/transactions/kinds';
import { SAVE_TRANSACTION_CATEGORY, saveCategory } from './../../src/categories/actions';

describe('Category Actions', () => {
	
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

    describe('SAVE_TRANSACTION_CATEGORY', () => {

        it('should dispatch success action after SAVE_TRANSACTION_CATEGORY', (done) => {
            const category = { id: 1, name: 'Car', kind: EXPENSE.id };
			const expectedActions = [
				{ type: SAVE_TRANSACTION_CATEGORY },
				{ type: SAVE_TRANSACTION_CATEGORY, result: 'success', category }
			]

			store.dispatch(saveCategory(category.name, category.kind));

			moxios.wait(() => {
				let request = moxios.requests.mostRecent();

				request.respondWith({
					status: 201,
					response: category

				}).then(() => {
					expect(store.getActions()).to.deep.equal(expectedActions);
					done();
				})
				.catch((error) => done(error.message));
			});
        })

		it('should dispatch fail action after SAVE_TRANSACTION_CATEGORY when something goes wrong', (done) => {
			const expectedResponse = {
				name: 'name already in use',				
			}
			const expectedActions = [
				{ type: SAVE_TRANSACTION_CATEGORY },
				{ type: SAVE_TRANSACTION_CATEGORY, result: 'fail', errors: expectedResponse }
			]

			store.dispatch(saveCategory('Car', INCOME));

			moxios.wait(() => {
				let request = moxios.requests.mostRecent();
				
				request.respondWith({
					status: 400,
					response: expectedResponse

				})
				.then((response) => {                    
					expect(store.getActions()).to.deep.equal(expectedActions);                    
					done();
				})
				.catch((error) => {
					done(`Actions arent equal: ${error}`)
				});
			});
		});
    })

})