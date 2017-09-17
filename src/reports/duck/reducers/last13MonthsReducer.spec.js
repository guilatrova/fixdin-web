import reducer from './last13MonthsReducer';
import actions from '../actions';

describe('reports/duck/reducers/last13MonthsReducer', () => {
    
    const initialState = {
        isFetching: false,
        data: { 
            expected: [],
            real: []
        },
        errors: {},
    };
    
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).to.deep.equal(initialState);
    });
    
    it("should be handled", () => {
        expect(
            reducer(initialState, actions.requestLast13MonthsReport())
        ).to.deep.equal({
            isFetching: true,
            data: { 
                expected: [],
                real: []
            },
            errors: {},
        });
    });
    
    xdescribe("should be handled when successful", () => {
        
        it('with "REAL" data', () => {
            const data = [ { id: 1 }, { id: 2 } ];
            expect(
                reducer(initialState, actions.receiveLast13MonthsReport('success', data, true))
            ).to.deep.equal({
                isFetching: false,
                data: { 
                    expected: [],
                    real: data
                },
                errors: {},
            });
        });
        
        it('with "EXPECTED" data', () => {
            const data = [ { id: 1 }, { id: 2 } ];
            expect(
                reducer(initialState, actions.receiveLast13MonthsReport('success', data, false))
            ).to.deep.equal({
                isFetching: false,
                data: { 
                    expected: data,
                    real: []
                },
                errors: {},
            });
        });
        
    });
    
    
    it('should be handled when failed', () => {
        const errors = { 'detail':'random error' }
        expect(
            reducer(initialState, actions.receiveLast13MonthsReport('fail', errors))
        ).to.deep.equal({                
            isFetching: false,
            data: { 
                expected: [],
                real: []
            },
            errors,
        });
    });
    
});