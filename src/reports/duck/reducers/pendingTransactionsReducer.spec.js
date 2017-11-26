import reducer from './pendingTransactionsReducer';
import actions from '../actions';
import { EXPENSE, INCOME } from '../../../transactions/kinds';

describe('reports/duck/reducers/pendingTransactionsReducer', () => {
    const initialState = {
        expenses: {
            next: [],
            overdue: [],
            isFetching: false
        },
        incomes: {
            next: [],
            overdue: [],
            isFetching: false
        },
        errors: {}
    };

    const fetchingState = {
        expenses: {
            next: [],
            overdue: [],
            isFetching: true
        },
        incomes: {
            next: [],
            overdue: [],
            isFetching: true
        },
        errors: {}
    };

    it ('should return initial state', () => {
        expect(
            reducer(undefined, {})
        )
        .to.deep.equal(initialState);
    });

    it("should be handled", () => {
        expect(
            reducer(undefined, actions.requestPendingTransactionsReport(EXPENSE))
        ).to.deep.equal({
            expenses: {
                next: [],
                overdue: [],
                isFetching: true
            },
            incomes: {
                next: [],
                overdue: [],
                isFetching: false
            },
            errors: {}
        });
    });
    
    describe("should be handled when successful", () => {
        
        it('with "expenses" data', () => {
            const data = { next: [ {id: 1}], overdue: [ {id: 4}] };
            expect(
                reducer(fetchingState, actions.receivePendingTransactionsReport('success', data, EXPENSE))
            ).to.deep.equal({
                expenses: {
                    ...data,
                    isFetching: false
                },
                incomes: {
                    next: [],
                    overdue: [],
                    isFetching: true
                },
                errors: {}
            });
        });
        
        it('with "incomes" data', () => {
            const data = { next: [ {id: 1}], overdue: [ {id: 4}] };
            expect(
                reducer(fetchingState, actions.receivePendingTransactionsReport('success', data, INCOME))
            ).to.deep.equal({
                expenses: {
                    next: [],
                    overdue: [],
                    isFetching: true
                },
                incomes: {
                    ...data,
                    isFetching: false
                },
                errors: {}
            });
        });
        
    });
    
    it('should be handled when failed', () => {
        const errors = { 'detail':'random error' };
        expect(
            reducer(fetchingState, actions.receivePendingTransactionsReport('fail', errors, INCOME))
        ).to.deep.equal({                
            expenses: {
                next: [],
                overdue: [],
                isFetching: true
            },
            incomes: {
                next: [],
                overdue: [],
                isFetching: false
            },
            errors
        });
    });
});