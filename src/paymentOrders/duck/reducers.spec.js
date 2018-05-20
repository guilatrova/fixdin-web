import moment from 'moment';
import reducer from './reducers';
import actions from './actions';
import formatters from '../formatters';
import types from './types';

describe('paymentOrders/duck/reducers', () => {

    const period = moment().startOf('month');
    const today = moment({ hour: 0});
    const yesterday = moment({ hour: 0}).subtract(1, 'day');
    const tomorrow = moment({ hour: 0}).add(1, 'day');

    const initialState = {
        remainingBalance: undefined,
        period,
        checked: [],
        totalChecked: 0,
        fetching: [],
        errors: {},
        yearBalance: undefined,
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
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    describe('CHECK_DEFAULT_EXPENSES', () => {
        it('all on TODAY', () => {
            const nextExpenses = [
                { id: 1, priority: 2, due_date: today, value: -10 },
                { id: 2, priority: 2, due_date: today, value: -20 },
                { id: 3, priority: 5, due_date: today, value: -30 }
            ];
            const state = {
                ...initialState,
                nextExpenses
            };
    
            //Expected order 3, 1, 2
            expect(
                reducer(state, actions.checkDefaultExpenses(45, nextExpenses))
            )
            .toEqual({
                ...state,
                checked: [ 3, 1 ],
                totalChecked: 40,
                remainingBalance: 5
            });
        });

        it('ignores future dates', () => {
            const nextExpenses = [
                { id: 1, priority: 2, due_date: today, value: -10 },
                { id: 2, priority: 2, due_date: yesterday, value: -20 },
                { id: 3, priority: 5, due_date: tomorrow, value: -30 }
            ];
            const state = {
                ...initialState,
                nextExpenses
            };
    
            expect(
                reducer(state, actions.checkDefaultExpenses(45, nextExpenses))
            )
            .toEqual({
                ...state,
                checked: [ 2, 1 ],
                totalChecked: 30,
                remainingBalance: 15
            });
        });
          
    });

    describe('TOGGLE_EXPENSE', () => {
        const expenses = [
            { "2018-03-01": [ { id: 1, value: "-10" }, { id: 2, value: "-15" } ], "2018-02-01": [ ] },
            { "2018-03-01": [ ], "2018-02-01": [ { id: 3, value: "-28" } ] },
        ];
        const formattedExpenses = formatters.reduceNextExpensesToTransactionsArray(expenses);

        it("Checks a new expense", () => {
            const state = {
                ...initialState,
                nextExpenses: expenses,
                checked: [ 1 ],
                remainingBalance: 20,
                totalChecked: 10
            };

            expect(
                reducer(state, actions.toggleExpense(2, formattedExpenses))
            ).toEqual({
                ...state,
                checked: [ 1, 2 ],
                remainingBalance: 5,
                totalChecked: 25
            });
        });

        it("Unchecks an expense", () => {
            const state = {
                ...initialState,
                nextExpenses: expenses,
                checked: [ 1, 2 ],
                remainingBalance: 5,
                totalChecked: 25
            };

            expect(
                reducer(state, actions.toggleExpense(2, formattedExpenses))
            ).toEqual({
                ...state,
                checked: [ 1 ],
                remainingBalance: 20,
                totalChecked: 10
            });
        });

        it('Accepts list', () => {
            const state = {
                ...initialState,
                nextExpenses: expenses,
                checked: [ 1, 3 ],
                totalChecked: 38,
                remainingBalance: 12
            };

            expect(
                reducer(state, actions.toggleExpense([2, 3], formattedExpenses))
            )
            .toEqual({
                ...state,
                checked: [ 1, 2 ],
                totalChecked: 25,
                remainingBalance: 25
            });
        });
    });

    it('RESET', () => {
        const state = {
            ...initialState,
            remainingBalance: 100,
            checked: [ 2, 3 ],
            totalChecked: 140,
            nextExpenses: createExpenses([ 30, 40, 70 ])
        };

        expect(
            reducer(state, actions.reset(20, createExpenses([ 30, 40 ])))
        ).toEqual({
            ...state,
            nextExpenses: createExpenses([ 30, 40 ]),
            remainingBalance: 20,
            checked: [],
            totalChecked: 0
        });
    });

    describe('NEXT_EXPENSES', () => {
        const fetchingState = {
            ...initialState,
            fetching: [ types.FETCH_NEXT_EXPENSES ],
        };

        it('should be handled', () => {
            expect(
                reducer(undefined, actions.fetchNextExpenses())
            ).toEqual(fetchingState);
        });

        it('should be handled when successful', () => {
            const nextExpenses = [ { id: 1 }, { id: 2 } ];
            expect(
                reducer(fetchingState, actions.receiveNextExpenses('success', nextExpenses))
            ).toEqual({
                ...fetchingState,
                fetching: [],
                nextExpenses
            });
        });

        it('should be handled when failed', () => {
            const errors = { detail: 'problem' };
            expect(
                reducer(fetchingState, actions.receiveNextExpenses('fail', errors))
            ).toEqual({
                ...fetchingState,
                fetching: [],
                errors
            });
        });
    });
});