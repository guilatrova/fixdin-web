import reducer from './lastMonthsReducer';
import actions from '../actions';

describe('reports/duck/reducers/lastMonthsReducer', () => {
    
    const initialState = {
        isFetching: false,
        data: [],
        errors: {},
    };
    
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(initialState);
    });
    
    it("should be handled", () => {
        expect(
            reducer(initialState, actions.requestLastMonthsReport())
        ).toEqual({
            isFetching: true,
            data: [],
            errors: {},
        });
    });

    it('should be handled when successful', () => {
        const data = [ { id: 1 }, { id: 2 } ];
        expect(
            reducer(initialState, actions.receiveLastMonthsReport('success', data))
        ).toEqual({
            isFetching: false,
            data,
            errors: {},
        });
    });
    
    it('should be handled when failed', () => {
        const errors = { 'detail':'random error' };
        expect(
            reducer(initialState, actions.receiveLastMonthsReport('fail', errors))
        ).toEqual({                
            isFetching: false,
            data: [],
            errors,
        });
    });
    
});