import reducer from './valuesByCategoryReducer';
import actions from '../actions';
import { EXPENSE, INCOME } from '../../../transactions/shared/kinds';

describe('reports/duck/reducers/valuesByCategoryReducers', () => {

    const initialState = {
        expenses: {
            isFetching: false,
            data: [],
            errors: {}
        },
        incomes: {
            isFetching: false,
            data: [],
            errors: {}
        }
    };

    const fetchingState = {
        expenses: {
            isFetching: true,
            data: [],
            errors: {}
        },
        incomes: {
            isFetching: true,
            data: [],
            errors: {}
        }
    };
    
    it('should return initial state', () => {
        expect(
            reducer(undefined, {})
        )
        .toEqual(initialState);
    });

    describe("should be handled", () => {

        it('with "expenses" data', () => {
            expect(
                reducer(undefined, actions.requestValuesByCategoryReport(EXPENSE))
            ).toEqual({
                expenses: {
                    isFetching: true,
                    data: [],
                    errors: {}
                },
                incomes: {
                    isFetching: false,
                    data: [],
                    errors: {}
                }
            });
        });

        it('with "incomes" data', () => {
            expect(
                reducer(undefined, actions.requestValuesByCategoryReport(INCOME))
            ).toEqual({
                expenses: {
                    isFetching: false,
                    data: [],
                    errors: {}
                },
                incomes: {
                    isFetching: true,
                    data: [],
                    errors: {}
                }
            });
        });

    });

    describe("should be handled when successful", () => {

        it('with "expenses" data', () => {
            const data = [ { id: 1 }, { id: 2 } ];
            expect(
                reducer(fetchingState, actions.receiveValuesByCategoryReport('success', data, EXPENSE))
            ).toEqual({
                expenses: {
                    isFetching: false,
                    data,
                    errors: {}
                },
                incomes: {
                    isFetching: true,
                    data: [],
                    errors: {}
                }
            });
        });

        it('with "incomes" data', () => {
            const data = [ { id: 1 }, { id: 2 } ];
            expect(
                reducer(fetchingState, actions.receiveValuesByCategoryReport('success', data, INCOME))
            ).toEqual({
                expenses: {
                    isFetching: true,
                    data: [],
                    errors: {}
                },
                incomes: {
                    isFetching: false,
                    data,
                    errors: {}
                }
            });
        });

    });


    describe("should be handled when failed", () => {
    
        it('with "expenses" data', () => {
            const errors = { 'detail':'random error' };
            expect(
                reducer(fetchingState, actions.receiveValuesByCategoryReport('fail', errors, EXPENSE))
            ).toEqual({                
                expenses: {
                    isFetching: false,
                    data: [],
                    errors
                },
                incomes: {
                    isFetching: true,
                    data: [],
                    errors: {}
                }
            });
        });
    
        it('with "incomes" data', () => {
            const errors = { 'detail':'random error' };
            expect(
                reducer(fetchingState, actions.receiveValuesByCategoryReport('fail', errors, INCOME))
            ).toEqual({                
                expenses: {
                    isFetching: true,
                    data: [],
                    errors: {}
                },
                incomes: {
                    isFetching: false,
                    data: [],
                    errors
                }
            });
        });

    });
});