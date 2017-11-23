import reducer from './valuesByCategoryReducer';
import actions from '../actions';
import { EXPENSE, INCOME } from '../../../transactions/kinds';

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
    }

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
    }
    
    it('should return initial state', () => {
        expect(
            reducer(undefined, {})
        )
        .to.deep.equal(initialState);
    });

    describe("should be handled", () => {

        it('with "expenses" data', () => {
            expect(
                reducer(undefined, actions.requestValuesByCategoryReport(EXPENSE))
            ).to.deep.equal({
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
            ).to.deep.equal({
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
            ).to.deep.equal({
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
            ).to.deep.equal({
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
            const errors = { 'detail':'random error' }
            expect(
                reducer(fetchingState, actions.receiveValuesByCategoryReport('fail', errors, EXPENSE))
            ).to.deep.equal({                
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
            const errors = { 'detail':'random error' }
            expect(
                reducer(fetchingState, actions.receiveValuesByCategoryReport('fail', errors, INCOME))
            ).to.deep.equal({                
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