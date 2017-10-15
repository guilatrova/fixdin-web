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
            arr.push({ id, value: values[i], due_date: values[i+1] });
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
            visibleIncomes: createIncomes([ 5, yesterday, 10, today, 15, tomorrow])
        }
        
        // console.log("state", createIncomes([ 5, yesterday, 10, today, 15, tomorrow]));

        expect(
            reducer(state, actions.checkDefaultIncomes(10))
        ).to.deep.equal({
            ...initialState,
            visibleIncomes: state.visibleIncomes,
            checked: [2, 3],
            totalChecked: 25, 
            total: 35
        });
    })

});