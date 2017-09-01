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
import { EXPENSE, INCOME } from './../../src/transactions/kinds';
import transactionReducer, { operations, types } from './../../src/transactions/transactions/duck';
import { ActionsTestHelper } from './../reduxTestHelpers';


describe('Transaction Actions', () => {
	
	const actionsTestHelper = new ActionsTestHelper();
	let store;

	beforeEach(() => {
		actionsTestHelper.mock();
		store = actionsTestHelper.createStore();
	})

	afterEach(() => {
		actionsTestHelper.clearMock();
	})

	describe('FETCH_TRANSACTIONS', () => {

		it('should dispatch success action after FETCH_TRANSACTIONS', (done) => {
			const transactions = [ { id: 1, value: '10', due_date: '2017-10-10', payment_date: '2017-10-10' }, { id: 2, value: '11', due_date: '2017-10-10', payment_date: '2017-10-10' }, { id: 3, value: '12', due_date: '2017-10-10', payment_date: '2017-10-10' }]
			const expectedActions = [
				{ type: types.FETCH_TRANSACTIONS },
				{ type: types.FETCH_TRANSACTIONS, result: 'success', transactions:transactions.map(item => ({
						...item,
						due_date: moment(item.due_date, 'YYYY-MM-DD'),
						payment_date: moment(item.payment_date, 'YYYY-MM-DD'),
						value: Number(item.value)
					})) 
				}
			]

			store.dispatch(operations.fetchTransactions(INCOME));

			actionsTestHelper.apiRespondsWith({
				status: 201,
				response: transactions
			})
			.assertAsyncActions(done, expectedActions);
		})

		it('should dispatch fail action after FETCH_TRANSACTION when something goes wrong', (done) => {
			const expectedResponse = {
				detail: 'invalid token',
			}
			const expectedActions = [
				{ type: types.FETCH_TRANSACTIONS },
				{ type: types.FETCH_TRANSACTIONS, result: 'fail', errors: expectedResponse }
			]

			store.dispatch(operations.fetchTransactions(INCOME));

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
		
		it('should add query params when filters is passed', (done) => {			
			store.dispatch(operations.fetchTransactions(INCOME, { 'due_date_from': '2017-10-01', 'category': 1 }));

			moxios.wait(() => {
				let request = moxios.requests.mostRecent();

				expect(request.url).to.have.string('?due_date_from=2017-10-01&category=1');
				done();
			});
		})
	})

	describe('SAVE_TRANSACTION', () => {
		const momentStub = moment(new Date(2017, 6, 1));
		const transaction = { //only necessary fields...
			value: '0',
			due_date: momentStub,
			payment_date: momentStub
		}

		it('should dispatch success action after SAVE_TRANSACTION', (done) => {
			const expectedResponse = transaction
			const expectedActions = [
				{ type: types.SAVE_TRANSACTION },
				{ type: types.SAVE_TRANSACTION, result: 'success', transaction: {
					...transaction,
					value: 0
					} 
				}
			]

			store.dispatch(operations.saveTransaction(transaction, INCOME));

			moxios.wait(() => {
				let request = moxios.requests.mostRecent();

				request.respondWith({
					status: 201,
					response: expectedResponse

				}).then(() => {
					expect(store.getActions()).to.deep.equal(expectedActions);
					done();
				})
				.catch((error) => done(error.message));
			});
		})

		it('should dispatch fail action after SAVE_TRANSACTION when something goes wrong', (done) => {
			const expectedResponse = {
				value: 'invalid value supplied',
				category: 'mandatory field'
			}
			const expectedActions = [
				{ type: types.SAVE_TRANSACTION },
				{ type: types.SAVE_TRANSACTION, result: 'fail', errors: expectedResponse }
			]

			store.dispatch(operations.saveTransaction(transaction, INCOME));

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

		it('should use PUT when id is supplied', (done) => {
			const editTransaction = {...transaction, id: 1}

			store.dispatch(operations.saveTransaction(editTransaction, INCOME));

			moxios.wait(() => {                
				let request = moxios.requests.mostRecent();
				expect(request.config.method).to.be.equal('put');
				expect(request.url.indexOf(editTransaction.id)).to.be.gt(-1);
				done();
			});
		})
	})

	describe('DELETE_TRANSACTION', () => {

		it('should dispatch success action after DELETE_TRANSACTION', (done) => {
			const expectedActions = [
				{ type: types.DELETE_TRANSACTION, id: 2 },
				{ type: types.DELETE_TRANSACTION, result: 'success', id: 2 }
			]

			store.dispatch(operations.deleteTransaction(2, INCOME));

			moxios.wait(() => {
				let request = moxios.requests.mostRecent();

				request.respondWith({
					status: 204
				}).then(() => {
					expect(store.getActions()).to.deep.equal(expectedActions);
					done();
				})
				.catch((error) => done(error.message));
			});
		})

		it('should dispatch fail action after DELETE_TRANSACTION when something goes wrong', (done) => {
			const errors = { 'detail': 'not found'}			
			const expectedActions = [
				{ type: types.DELETE_TRANSACTION, id: 2 },
				{ type: types.DELETE_TRANSACTION, result: 'fail', errors }
			]

			store.dispatch(operations.deleteTransaction(2, INCOME));

			moxios.wait(() => {
				let request = moxios.requests.mostRecent();

				request.respondWith({
					status: 404,
					response: errors
				}).then(() => {
					expect(store.getActions()).to.deep.equal(expectedActions);
					done();
				})
				.catch((error) => done(error.message));
			});
		})

	})
})