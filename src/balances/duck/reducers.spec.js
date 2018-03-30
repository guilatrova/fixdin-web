import reducer from './reducers';
import actions from './actions';

describe('balances/duck/reducers', () => {

    const initialState = {
        balance: null,
        realBalance: null,
        expectedBalance: null,
        pendingIncomes: null,
        pendingExpenses: null,
        detailedAccounts: [],
        isFetching: false,
        errors: {},
    };

    const fetchingState = {
        ...initialState,
        isFetching: true
    };

    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(initialState);
    });

    describe("FETCH_BALANCE", () => {

        it("should be handled", () => {
            expect(
                reducer(initialState, actions.requestBalance())
            ).toEqual({
                ...initialState,
                isFetching: true,
                errors: {},
            });
        });

        it("should be handled when successful", () => {
            expect(
                reducer(fetchingState, actions.receiveBalance('success', 50, 'balance'))
            ).toEqual({
                ...fetchingState,
                balance: 50,
                isFetching: false,
                errors: {},
            });
        });

        it('should be handled when failed', () => {
            const errors = { 'detail':'random error' };
            expect(
                reducer(fetchingState, actions.receiveBalance('fail', errors, 'balance'))
            ).toEqual({
                ...fetchingState,
                isFetching: false,
                errors,
            });
        });

    });

});