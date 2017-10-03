import { EXPENSE, INCOME } from '../../kinds';
import operations from './operations';
import types from './types';
import * as apiModule from '../../../services/api';

const formatExpectedTransaction = (item) => {
	return {
		...item,
		due_date: moment(item.due_date, 'YYYY-MM-DD'),
		payment_date: moment(item.payment_date, 'YYYY-MM-DD'),
		value: Number(item.value)
	};
}

describe('transaction/duck/actions', () => {
	
	const testHelper = new ActionsTestHelper();
	let store;

	beforeEach(() => {
		testHelper.mock(apiModule);
		store = testHelper.createStore();
	})

	afterEach(() => {
		testHelper.clearMock();
	})

	describe('FETCH_TRANSACTIONS', () => {

		it('should dispatch success action after FETCH_TRANSACTIONS', (done) => {
			const transactions = [ { id: 1, value: '10', due_date: '2017-10-10', payment_date: '2017-10-10' }, { id: 2, value: '11', due_date: '2017-10-10', payment_date: '2017-10-10' }, { id: 3, value: '12', due_date: '2017-10-10', payment_date: '2017-10-10' }]
			const expectedActions = [
				{ type: types.FETCH_TRANSACTIONS },
				{ type: types.FETCH_TRANSACTIONS, result: 'success', transactions:transactions.map(item => formatExpectedTransaction(item)) }
			]

			store.dispatch(operations.fetchTransactions(INCOME));

			testHelper.apiRespondsWith({
				status: 201,
				response: transactions
			})
			.expectActionsAsync(done, expectedActions);
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

			testHelper.apiRespondsWith({
				status: 400,
				response: expectedResponse
			})
			.expectActionsAsync(done, expectedActions);
		})
		
		it('should add query params when filters is passed', (done) => {			
			store.dispatch(operations.fetchTransactions(INCOME, { 'due_date_from': '2017-10-01', 'category': 1 }));

			testHelper
				.apiRespondsWith({ status: 200, response: [] })
				.expectAsync(done, request => {
					expect(request.url).to.have.string('?due_date_from=2017-10-01&category=1');
				});
		})
	})

	describe('FILTER_TRANSACTIONS', () => {

		it('should dispatch success action when request successful', (done) => {
			const transactions = [ { id: 1, value: '10', due_date: '2017-10-10', payment_date: '2017-10-10' }, { id: 2, value: '11', due_date: '2017-10-10', payment_date: '2017-10-10' }, { id: 3, value: '12', due_date: '2017-10-10', payment_date: '2017-10-10' }]
			const mapped = transactions.map(transaction => formatExpectedTransaction(transaction));
			const expectedActions = [
				{ type: types.FILTER_TRANSACTIONS },
				{ type: types.FILTER_TRANSACTIONS, result: 'success', transactions: mapped },
			]

			store.dispatch(operations.filterTransactions({}));

			testHelper.apiRespondsWith({
				status: 201,
				response: transactions
			})
			.expectActionsAsync(done, expectedActions);
		})

		it('should dispatch fail action when request fails', (done) => {
			const expectedResponse = {
				detail: 'invalid token',
			}
			const expectedActions = [
				{ type: types.FILTER_TRANSACTIONS },
				{ type: types.FILTER_TRANSACTIONS, result: 'fail', errors: expectedResponse }
			]

			store.dispatch(operations.filterTransactions(INCOME));

			testHelper.apiRespondsWith({
				status: 400,
				response: expectedResponse
			})
			.expectActionsAsync(done, expectedActions);
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
				{ type: types.SAVE_TRANSACTION, result: 'success', transactions: [{
					...transaction,
					value: 0
					}]
				}
			]

			store.dispatch(operations.saveTransaction(transaction, INCOME, types.SAVE_TRANSACTION));

			testHelper.apiRespondsWith({
				status: 201,
				response: expectedResponse
			})
			.expectActionsAsync(done, expectedActions);
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

			store.dispatch(operations.saveTransaction(transaction, INCOME, types.SAVE_TRANSACTION));

			testHelper.apiRespondsWith({
				status: 400,
				response: expectedResponse
			})
			.expectActionsAsync(done, expectedActions);
		});

		it('should use PUT when id is supplied', (done) => {
			const editTransaction = {...transaction, id: 1}

			store.dispatch(operations.saveTransaction(editTransaction, INCOME, types.SAVE_TRANSACTION));

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
				{ type: types.DELETE_TRANSACTION, id: 2, type: types.DELETE_TRANSACTION },
				{ type: types.DELETE_TRANSACTION, result: 'success', id: 2, type: types.DELETE_TRANSACTION }
			]

			store.dispatch(operations.deleteTransaction(2, INCOME, types.DELETE_TRANSACTION));

			testHelper.apiRespondsWith({
				status: 204
			})
			.expectActionsAsync(done, expectedActions);			
		})

		it('should dispatch fail action after DELETE_TRANSACTION when something goes wrong', (done) => {
			const errors = { 'detail': 'not found'}			
			const expectedActions = [
				{ type: types.DELETE_TRANSACTION, id: 2, type: types.DELETE_TRANSACTION },
				{ type: types.DELETE_TRANSACTION, result: 'fail', errors, type: types.DELETE_TRANSACTION }
			]

			store.dispatch(operations.deleteTransaction(2, INCOME, types.DELETE_TRANSACTION));

			testHelper.apiRespondsWith({
				status: 404,
				response: errors
			})
			.expectActionsAsync(done, expectedActions);
		})

	})
})