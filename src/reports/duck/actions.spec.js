import operations from './operations';
import types from './types';
import { EXPENSE, INCOME } from '../../transactions/shared/kinds';

describe('reports/duck/actions', () => {
	// let store, mock, restoreMock;
	const { itShouldDispatchSuccessFailActions, itShouldDispatchSuccessFailActionsCustom } = actionsHelpers;

	beforeEach(() => {
		// const mockHelper = mockAxios();
		// mock = mockHelper.mock;
		// store = mockHelper.store;
		// restoreMock = mockHelper.restoreMock;
	});

	afterEach(() => {
		// restoreMock();
	});

	describe('FETCH_LAST_MONTHS', () => {

		itShouldDispatchSuccessFailActions(
			operations.fetchLastMonthsReport,
			types.FETCH_LAST_MONTHS,
			'data',
			[ { id: 1 }, { id: 2 } ]
		);
	});
	
	describe('FETCH_PENDING_TRANSACTIONS', () => {
		const data = [ { id: 1 }, { id: 2 } ];
		const kind = EXPENSE;

		itShouldDispatchSuccessFailActionsCustom(
			() => operations.fetchPendingTransactionsReport(kind),
			types.FETCH_PENDING_TRANSACTIONS,
			{ kind },
			{ data, kind },
			{ kind },
			data
		);
	});

	describe('FETCH_VALUES_BY_CATEGORY', () => {
		const data = [ { id: 1 }, { id: 2 } ];
		const kind = INCOME;

		itShouldDispatchSuccessFailActionsCustom(
			() => operations.fetchValuesByCategoryReport(kind),
			types.FETCH_VALUES_BY_CATEGORY,
			{ kind },
			{ data, kind },
			{ kind },
			data
		);
	});
    
});