import reducer from './step2Reducer';
import actions from '../actions';

describe('paymentOrders/duck/reducers/Step2', () => {

    const today = moment({ hour: 0});
    const yesterday = moment({ hour: 0}).subtract(1, 'day');
    const tomorrow = moment({ hour: 0}).add(1, 'day');

    const initialState = {
        remainingBalance: undefined,
        checked: [],
        totalChecked: 0,
        visibleExpenses: []
    }

    const createExpenses = (values) => {
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

    describe('TOGGLE_EXPENSE', () => {
        const expenses = createExpenses([ yesterday, 10, today, 15, tomorrow, 28 ]);

        it("Checks a new expense", () => {
            const state = {
                ...initialState,
                visibleExpenses: expenses,
                checked: [ 1 ],
                remainingBalance: 20,
                totalChecked: 10
            }

            expect(
                reducer(state, actions.toggleExpense(2))
            ).to.deep.equal({
                ...state,
                checked: [ 1, 2 ],
                remainingBalance: 5,
                totalChecked: 25
            });
        });

        it("Unchecks an expense", () => {
            const state = {
                ...initialState,
                visibleExpenses: expenses,
                checked: [ 1, 2 ],
                remainingBalance: 5,
                totalChecked: 25
            }

            expect(
                reducer(state, actions.toggleExpense(2))
            ).to.deep.equal({
                ...state,
                checked: [ 1 ],
                remainingBalance: 20,
                totalChecked: 10
            });
        });

        it('Accepts list', () => {
            const state = {
                ...initialState,
                visibleExpenses: expenses,
                checked: [ 1, 3 ],
                totalChecked: 38,
                remainingBalance: 12
            };

            expect(
                reducer(state, actions.toggleExpense([2, 3]))
            )
            .to.deep.equal({
                ...state,
                checked: [ 1, 2 ],
                totalChecked: 25,
                remainingBalance: 25
            });
        });
    });

    describe('CHECK_DEFAULT_EXPENSES', () => {

    });
});