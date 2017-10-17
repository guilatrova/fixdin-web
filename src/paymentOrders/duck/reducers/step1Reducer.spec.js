import reducer from './step1Reducer';
import actions from '../actions';

describe('paymentOrder/duck/reducers/Step1', () => {

    const today = moment({ hour: 0});
    const yesterday = moment({ hour: 0}).subtract(1, 'day');
    const tomorrow = moment({ hour: 0}).add(1, 'day');

    const initialState = {
        checked: [],
        visibleIncomes: [],
        untilDate: today,
        total: 0,
        toSave: 0,
        totalChecked: 0
    }    

    const createIncomes = (values) => {
        let arr = [];
        let id = 1;
        for (let i = 0; i < values.length; i+=2) {
            arr.push({ id, value: values[i+1], due_date: values[i] });
            id++;
        }
        return arr;
    }

    it('should return initial state', () => {
        expect(reducer(undefined, {})).to.deep.equal(initialState);
    });

    it('CHECK_DEFAULT_INCOMES', () => {
        const state = {
            ...initialState,
            visibleIncomes: createIncomes([ yesterday, 5, today, 10, tomorrow, 15])
        }
        
        expect(
            reducer(state, actions.checkDefaultIncomes(10))
        ).to.deep.equal({
            ...initialState,
            visibleIncomes: state.visibleIncomes,
            checked: [2, 3],
            totalChecked: 25, 
            total: 35
        });
    });

    describe('CHANGE_UNTIL_DATE', () => {
        const incomes = createIncomes([ yesterday, 10, today, 20, tomorrow, 30 ]);

        it('should update visibleIncomes', () => {
            expect(
                reducer(undefined, actions.changeUntilDate(yesterday, [incomes[0]]))
            )
            .to.deep.equal({
                ...initialState,
                visibleIncomes: [ incomes[0] ],
                untilDate: yesterday
            });
        });

        it('should update checked and total', () => {
            const state = {
                ...initialState,
                visibleIncomes: incomes,
                checked: [ 1, 3 ],
                totalChecked: 40,
                total: 50
            }

            expect(
                reducer(state, actions.changeUntilDate(yesterday, [incomes[0]]))
            )
            .to.deep.equal({
                ...state,
                visibleIncomes: [incomes[0]],
                untilDate: yesterday,
                checked: [ 1 ],
                totalChecked: 10,
                total: 20
            });

        });

    });

});