import reducer from './step1Reducer';
import actions from '../actions';

describe('paymentOrders/duck/reducers/Step1', () => {

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

    describe('TOGGLE_INCOME', () => {
        const incomes = createIncomes([ yesterday, 10, today, 15, tomorrow, 28 ]);

        it('Checks a new income', () => {
            const state = {
                ...initialState,
                visibleIncomes: incomes,
                checked: [ 1 ],
                total: 10,
                totalChecked: 10
            };

            expect(
                reducer(state, actions.toggleIncome(2))
            )
            .to.deep.equal({
                ...state,
                checked: [ 1, 2 ],
                total: 25,
                totalChecked: 25
            });
        });

        it('Unchecks an income', () => {
            const state = {
                ...initialState,
                visibleIncomes: incomes,
                checked: [ 1, 2 ],
                total: 25,
                totalChecked: 25
            };

            expect(
                reducer(state, actions.toggleIncome(1))
            )
            .to.deep.equal({
                ...state,
                checked: [ 2 ],
                total: 15,
                totalChecked: 15
            });
        });

        it('Accepts list', () => {
            const state = {
                ...initialState,
                visibleIncomes: incomes,
                checked: [ 1, 2 ],
                total: 25,
                totalChecked: 25
            };

            expect(
                reducer(state, actions.toggleIncome([2, 3]))
            )
            .to.deep.equal({
                ...state,
                checked: [ 1, 3 ],
                total: 38,
                totalChecked: 38
            });
        });
    });

    it('CHANGE_VALUE_TO_SAVE', () => {
        const state = {
            ...initialState,
            toSave: 10,
            total: 30
        }

        expect(
            reducer(state, actions.changeValueToSave(5))
        )
        .to.deep.equal({
            ...state,
            toSave: 5,
            total: 35
        });
    });

    it('RESET', () => {
        const incomes = createIncomes([ yesterday, 10, today, 20, tomorrow, 30 ]);
        const state = {
            ...initialState,
            checked: [ 1, 2 ],
            visibleIncomes: incomes,
            untilDate: tomorrow,
            total: 50,
            toSave: 5,
            totalChecked: 30
        }

        expect(
            reducer(state, actions.resetStep1(25, [incomes[0], incomes[1]]))
        )
        .to.deep.equal({
            ...initialState,
            total: 25,
            untilDate: today,
            visibleIncomes: [ incomes[0], incomes[1] ]
        });
    });

});