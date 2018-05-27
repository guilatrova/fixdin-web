import { INCOME } from '../../shared/kinds';
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

const { itShouldDispatchSuccessFailActionsCustom } = actionsHelpers;

describe('transaction/duck/actions', () => {

	describe('FETCH_TRANSACTIONS', () => {
		const transactions = [ { id: 1, value: '10', due_date: '2017-10-10', payment_date: '2017-10-10' }, { id: 2, value: '11', due_date: '2017-10-10', payment_date: '2017-10-10' }, { id: 3, value: '12', due_date: '2017-10-10', payment_date: '2017-10-10' }];
		const transactionActions = transactions.map(item => formatExpectedTransaction(item));

		itShouldDispatchSuccessFailActionsCustom(
			() => operations.fetchTransactions(),
			types.FETCH_TRANSACTIONS,
			null,
			{ transactions: transactionActions },
			null,
			transactions
		);
	});

	xdescribe('FILTER_TRANSACTIONS', () => {

		const transactions = [ { id: 1, value: '10', due_date: '2017-10-10', payment_date: '2017-10-10' }, { id: 2, value: '11', due_date: '2017-10-10', payment_date: '2017-10-10' }, { id: 3, value: '12', due_date: '2017-10-10', payment_date: '2017-10-10' }];
		const transactionActions = transactions.map(item => formatExpectedTransaction(item));

		itShouldDispatchSuccessFailActionsCustom(
			() => operations.filterTransactions(INCOME),
			types.FILTER_TRANSACTIONS,
			null,
			{ transactions: transactionActions },
			null,
			transactions
		);
	});

	xdescribe('SAVE_TRANSACTION', () => {
		const momentStub = moment(new Date(2017, 6, 1, 0, 0, 0));
		const transaction = { //only necessary fields...
			value: '0',
			due_date: momentStub,
			payment_date: momentStub
		};
		const formatted = formatExpectedTransaction(transaction);

		itShouldDispatchSuccessFailActionsCustom(
			() => operations.saveTransaction(transaction, types.SAVE_TRANSACTION),
			types.SAVE_TRANSACTION,
			null,
			{ transactions: [ formatted ]},
			null,
			transaction
		);
	});

	describe('DELETE_TRANSACTION', () => {
		const id = 2;
		itShouldDispatchSuccessFailActionsCustom(
			() => operations.deleteTransaction(id, types.DELETE_TRANSACTION),
			types.DELETE_TRANSACTION,
			{ id },
			{ id }
		);

	});
});