import operations from './operations';
import types from './types';

const { itShouldDispatchSuccessFailActions } = actionsHelpers;

xdescribe('paymentorders/duck/actions', () => {
    describe('FETCH_NEXT_EXPENSES', () => {
        itShouldDispatchSuccessFailActions(
            operations.fetchNextExpenses,
            types.FETCH_NEXT_EXPENSES,
            'nextExpenses',
            [ {id:1}, {id:2} ]
        );
    });
});