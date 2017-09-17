import reducer from './valuesByCategoryReducer';
import actions from '../actions';

xdescribe('reports/duck/reducers/valuesByCategoryReducers', () => {
    
    it ('should return initial state');

    it("should be handled", () => {
        expect(
            
        ).to.deep.equal({

        });
    });

    describe("should be handled when successful", () => {

        it('with "expenses" data', () => {
            const data = [ { id: 1 }, { id: 2 } ];
            expect(
            ).to.deep.equal({
                isFetching: false,
                data: { 
                    expected: [],
                    real: data
                },
                errors: {},
            });
        });

        it('with "incomes" data', () => {
            const data = [ { id: 1 }, { id: 2 } ];
            expect(

            ).to.deep.equal({

            });
        });

    });


    it('should be handled when failed', () => {
        const errors = { 'detail':'random error' }
        expect(
            
        ).to.deep.equal({                
            
        });
    });
});