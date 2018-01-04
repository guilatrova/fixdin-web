import { INCOME } from '../../kinds';
import operations from './operations';
import types from './types';
import moment from 'moment';

const formatExpectedTransaction = (item) => {
	return {
		...item,
		due_date: moment(item.due_date, 'YYYY-MM-DD'),
		payment_date: moment(item.payment_date, 'YYYY-MM-DD'),
		value: Number(item.value)
	};
};

describe('transaction/duck/actions', () => {
	let store, mock, restoreMock;

	beforeEach(() => {
		const mockHelper = mockAxios();
		mock = mockHelper.mock;
		store = mockHelper.store;
		restoreMock = mockHelper.restoreMock;
	});

	afterEach(() => {
		restoreMock();
	});

	describe('FETCH_TRANSACTIONS', () => {

		xit('should dispatch success action after FETCH_TRANSACTIONS', () => {
			const transactions = [ { id: 1, value: '10', due_date: '2017-10-10', payment_date: '2017-10-10' }, { id: 2, value: '11', due_date: '2017-10-10', payment_date: '2017-10-10' }, { id: 3, value: '12', due_date: '2017-10-10', payment_date: '2017-10-10' }];
			const expectedActions = [
				{ type: types.FETCH_TRANSACTIONS },
				{ type: types.FETCH_TRANSACTIONS, result: 'success', transactions:transactions.map(item => formatExpectedTransaction(item)) }
			];

			mock.onGet().reply(200, transactions);

			expect.objectContaining();
			return store.dispatch(operations.fetchTransactions(INCOME)).then(() => {
				expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions));
			});
		});

		xit('should dispatch fail action after FETCH_TRANSACTION when something goes wrong', () => {
			const expectedResponse = {
				detail: 'invalid token',
			};
			const expectedActions = [
				{ type: types.FETCH_TRANSACTIONS },
				{ type: types.FETCH_TRANSACTIONS, result: 'fail', errors: expectedResponse }
			];

			mock.onGet().reply(400, expectedResponse);

			return store.dispatch(operations.fetchTransactions(INCOME)).then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		});
		
		xit('should add query params when filters is passed', () => {			
			//TODO: test this in operations
			// store.dispatch(operations.fetchTransactions(INCOME, { 'due_date_from': '2017-10-01', 'category': 1 }));

			// testHelper
			// 	.apiRespondsWith({ status: 200, response: [] })
			// 	.expectAsync(done, request => {
			// 		expect(request.url).to.have.string('?due_date_from=2017-10-01&category=1');
			// 	});
		});
	});

	xdescribe('FILTER_TRANSACTIONS', () => {

		it('should dispatch success action when request successful', () => {
			const transactions = [ { id: 1, value: '10', due_date: '2017-10-10', payment_date: '2017-10-10' }, { id: 2, value: '11', due_date: '2017-10-10', payment_date: '2017-10-10' }, { id: 3, value: '12', due_date: '2017-10-10', payment_date: '2017-10-10' }];
			const mapped = transactions.map(transaction => formatExpectedTransaction(transaction));
			const expectedActions = [
				{ type: types.FILTER_TRANSACTIONS },
				{ type: types.FILTER_TRANSACTIONS, result: 'success', transactions: mapped },
			];

			mock.onGet().reply(200, transactions);

			return store.dispatch(operations.filterTransactions({})).then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		});

		it('should dispatch fail action when request fails', () => {
			const expectedResponse = {
				detail: 'invalid token',
			};
			const expectedActions = [
				{ type: types.FILTER_TRANSACTIONS },
				{ type: types.FILTER_TRANSACTIONS, result: 'fail', errors: expectedResponse }
			];

			mock.onGet().reply(400, expectedResponse);

			return store.dispatch(operations.filterTransactions(INCOME)).then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		});
	});

	describe('SAVE_TRANSACTION', () => {
		const momentStub = moment(new Date(2017, 6, 1));
		const transaction = { //only necessary fields...
			value: '0',
			due_date: momentStub,
			payment_date: momentStub
		};

		xit('should dispatch success action after SAVE_TRANSACTION', () => {
			const expectedResponse = transaction;
			const formatted = formatExpectedTransaction(transaction);
			const expectedActions = [
				{ type: types.SAVE_TRANSACTION },
				{ type: types.SAVE_TRANSACTION, result: 'success', transactions: [ formatted ] }
			];

			mock.onPost().reply(201, expectedResponse);

			return store.dispatch(operations.saveTransaction(transaction, INCOME, types.SAVE_TRANSACTION)).then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		});

		it('should dispatch fail action after SAVE_TRANSACTION when something goes wrong', () => {
			const expectedResponse = {
				value: 'invalid value supplied',
				category: 'mandatory field'
			};
			const expectedActions = [
				{ type: types.SAVE_TRANSACTION },
				{ type: types.SAVE_TRANSACTION, result: 'fail', errors: expectedResponse }
			];

			mock.onPost().reply(400, expectedResponse);

			return store.dispatch(operations.saveTransaction(transaction, INCOME, types.SAVE_TRANSACTION)).then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		});

		xit('should use PUT when id is supplied', () => {
			//TODO: Test this in operations
			// const editTransaction = {...transaction, id: 1}

			// store.dispatch(operations.saveTransaction(editTransaction, INCOME, types.SAVE_TRANSACTION));

			// moxios.wait(() => {                
			// 	let request = moxios.requests.mostRecent();
			// 	expect(request.config.method).to.be.equal('put');
			// 	expect(request.url.indexOf(editTransaction.id)).to.be.gt(-1);
			// 	done();
			// });
		});
	});

	describe('DELETE_TRANSACTION', () => {

		it('should dispatch success action after DELETE_TRANSACTION', () => {
			const expectedActions = [
				{ type: types.DELETE_TRANSACTION, id: 2 },
				{ type: types.DELETE_TRANSACTION, result: 'success', id: 2 }
			];

			mock.onDelete().reply(204);

			return store.dispatch(operations.deleteTransaction(2, INCOME, types.DELETE_TRANSACTION)).then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});	
		});

		it('should dispatch fail action after DELETE_TRANSACTION when something goes wrong', () => {
			const errors = { 'detail': 'not found' };
			const expectedActions = [
				{ type: types.DELETE_TRANSACTION, id: 2 },
				{ type: types.DELETE_TRANSACTION, result: 'fail', errors }
			];

			mock.onDelete().reply(404, errors);

			return store.dispatch(operations.deleteTransaction(2, INCOME, types.DELETE_TRANSACTION)).then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		});

	});
});