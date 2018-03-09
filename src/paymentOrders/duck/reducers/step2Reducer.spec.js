import reducer from './step2Reducer';
import actions from '../actions';
import moment from 'moment';

describe('paymentOrders/duck/reducers/Step2', () => {

    const today = moment({ hour: 0});
    const yesterday = moment({ hour: 0}).subtract(1, 'day');
    const tomorrow = moment({ hour: 0}).add(1, 'day');

    const initialState = {
        remainingBalance: undefined,
        checked: [],
        totalChecked: 0,
        visibleExpenses: [],
        isFetching: false,
        errors: {},
        nextExpenses: []
    };

    const createExpenses = (values) => {
        let arr = [];
        let id = 1;
        for (let i = 0; i < values.length; i++) {
            arr.push({ id, value: values[i] });
            id++;
        }
        return arr;
    };

    it('should return initial state', () => {
        expect(reducer(undefined, {})).to.deep.equal(initialState);
    });

    it('CHECK_DEFAULT_EXPENSES', () => {
        const visibleExpenses = [
            { id: 1, priority: 2, due_date: today, value: -10 },
            { id: 2, priority: 2, due_date: yesterday, value: -20 },
            { id: 3, priority: 5, due_date: tomorrow, value: -30 }
        ];
        const state = {
            ...initialState,
            visibleExpenses
        };

        //Expected order 3, 1, 2
        expect(
            reducer(state, actions.checkDefaultExpenses(45, visibleExpenses))
        )
        .to.deep.equal({
            ...state,
            checked: [ 3, 1 ],
            totalChecked: 40,
            remainingBalance: 5
        });
    });

    describe('TOGGLE_EXPENSE', () => {
        const expenses = createExpenses([ -10, -15, -28 ]);

        it("Checks a new expense", () => {
            const state = {
                ...initialState,
                visibleExpenses: expenses,
                checked: [ 1 ],
                remainingBalance: 20,
                totalChecked: -10
            };

            expect(
                reducer(state, actions.toggleExpense(2))
            ).to.deep.equal({
                ...state,
                checked: [ 1, 2 ],
                remainingBalance: 5,
                totalChecked: -25
            });
        });

        it("Unchecks an expense", () => {
            const state = {
                ...initialState,
                visibleExpenses: expenses,
                checked: [ 1, 2 ],
                remainingBalance: 5,
                totalChecked: -25
            };

            expect(
                reducer(state, actions.toggleExpense(2))
            ).to.deep.equal({
                ...state,
                checked: [ 1 ],
                remainingBalance: 20,
                totalChecked: -10
            });
        });

        it('Accepts list', () => {
            const state = {
                ...initialState,
                visibleExpenses: expenses,
                checked: [ 1, 3 ],
                totalChecked: -38,
                remainingBalance: 12
            };

            expect(
                reducer(state, actions.toggleExpense([2, 3]))
            )
            .to.deep.equal({
                ...state,
                checked: [ 1, 2 ],
                totalChecked: -25,
                remainingBalance: 25
            });
        });
    });

    it('RESET_STEP2', () => {
        const state = {
            ...initialState,
            remainingBalance: 100,
            checked: [ 2, 3 ],
            totalChecked: 140,
            visibleExpenses: createExpenses([ 30, 40, 70 ])
        };

        expect(
            reducer(state, actions.resetStep2(20, createExpenses([ 30, 40 ])))
        ).to.deep.equal({
            ...state,
            visibleExpenses: createExpenses([ 30, 40 ]),
            remainingBalance: 20,
            checked: [],
            totalChecked: 0
        });
    });

    describe('NEXT_EXPENSES', () => {
        const fetchingState = {
            ...initialState,
            isFetching: true
        };

        it('should be handled', () => {
            expect(
                reducer(undefined, actions.fetchNextExpenses())
            ).toEqual({
                ...initialState,
                isFetching: true
            });
        });

        it('should be handled when successful', () => {
            const nextExpenses = [ { id: 1 }, { id: 2 } ];
            expect(
                reducer(fetchingState, actions.receiveNextExpenses('success', nextExpenses))
            ).toEqual({
                ...fetchingState,
                isFetching: false,
                nextExpenses
            });
        });

        it('should be handled when failed', () => {
            const errors = { detail: 'problem' };
            expect(
                reducer(fetchingState, actions.receiveNextExpenses('fail', errors))
            ).toEqual({
                ...fetchingState,
                isFetching: false,
                errors
            });
        });
    });

});