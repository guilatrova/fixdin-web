import { EXPENSE, INCOME } from '../../shared/kinds';
import reducer from './reducers';
import actions from './actions';
import types from './types';

describe('categories/duck/reducers', () => {

    const initialState = {
        fetching: [],
        errors: {},
        categories: [],
        editingCategory: {}
    };

    const fetchingState = {
        ...initialState,
        fetching: [],
        errors: {},
    };

    it('should return the inital state', () => {
        expect(
            reducer(undefined, {})            
        ).toEqual(initialState);
    });

    describe("SAVE_TRANSACTION_CATEGORY", () => {

        it('should be handled', () => {
            expect(
                reducer(undefined, actions.requestSaveCategory())
            ).toEqual({
                categories: [],
                editingCategory: {},
                fetching: [ types.SAVE_TRANSACTION_CATEGORY ],
                errors: {}
            });
        });

        it('should be handled when successful', () => {
            const data = { id: 1 };
            expect(
                reducer(fetchingState, actions.receiveSaveCategory('success', data))
            ).toEqual({
                editingCategory: {},
                fetching: [],
                categories: [ data ],
                errors: {}
            });
        });

        it('should be handled when failed', () => {
            const errors = { name: 'name under use' };
            expect(
                reducer(fetchingState, actions.receiveCategories('fail', errors))
            ).toEqual({
                editingCategory: {},
                categories: [],
                fetching: [],
                errors
            });
        });

        it('should add category result to categories when id NOT in list', () => {            
            const initialList = [ { id: 1, name: 'Car'}, { id: 2, name: 'Feeding' }];
            const categoryToSave = { id: 3, name: 'House' };
            const expectedList = [ ...initialList, categoryToSave ];
            const state = {
                ...initialState,
                categories: initialList
            };

            expect(
                reducer(state, actions.receiveSaveCategory('success', categoryToSave))
            ).toEqual({
                fetching: [],
                errors: {},
                categories: expectedList,
                editingCategory: {}
            });
        });

        it('should update category result when id in list', () => {
            const initialList = [ { id: 1, name: 'Car'}, { id: 2, name: 'Feeding' }];
            const categoryToSave = { id: 2, name: 'Eating out' };
            const expectedList = [ initialList[0], categoryToSave ];
            const state = {
                ...initialState,
                categories: initialList
            };

            expect(
                reducer(state, actions.receiveSaveCategory('success', categoryToSave))
            ).toEqual({
                fetching: [],
                errors: {},
                categories: expectedList,
                editingCategory: {}
            });
        });
    });

    describe("FETCH_TRANSACTION_CATEGORIES", () => {
        it('should be handled', () => {
            expect(
                reducer(undefined, actions.requestCategories())
            ).toEqual({
                categories: [],
                errors: {},
                editingCategory: {},
                fetching: [types.FETCH_TRANSACTION_CATEGORIES]
            });
        });

        it('should be handled when successful', () => {
            const categories = [ { id: 1 }, { id: 2} ];

            expect(
                reducer(fetchingState, actions.receiveCategories('success', categories))
            ).toEqual({
                editingCategory: {},
                errors: {},
                fetching: [],
                categories
            });
        });

        it('should be handled when failed', () => {
            const errors = { detail: 'you cant see those categories' };
            expect(
                reducer(fetchingState, actions.receiveCategories('fail', errors))
            ).toEqual({
                editingCategory: {},
                categories: [],
                fetching: [],
                errors
            });
        });

        it('should replace only categories from requested kind', () => {
            const someCategoriesState = {
                ...initialState,
                categories: [
                    { id: 1, name: 'c1', kind: INCOME.id },
                    { id: 2, name: 'c2', kind: EXPENSE.id },
                ]
            };
            const received = [
                { id: 2, name: 'new c2', kind:EXPENSE.id },
                { id: 3, name: 'c3', kind: EXPENSE.id }
            ];

            expect(
                reducer(someCategoriesState, actions.receiveCategories('success', received, EXPENSE))
            ).toEqual({
                fetching: [],
                errors: {},
                editingCategory: {},
                categories: [
                    { id: 1, name: 'c1', kind: INCOME.id },
                    { id: 2, name: 'new c2', kind: EXPENSE.id },
                    { id: 3, name: 'c3', kind: EXPENSE.id }
                ]
            });
        });
    });

    describe('EDIT_TRANSACTION_CATEGORY + FINISH_EDIT_TRANSACTION_CATEGORY', () => {

        const categories = [
            { id: 1, name: 'eating out', category: EXPENSE },
            { id: 2, name: 'moneyyyy', category: INCOME }
        ];

        const state = {
            categories,
            errors: {},
            fetching: []
        };

        it('should handle EDIT_TRANSACTION_CATEGORY', () => {
            expect(
                reducer(state, actions.editCategory(1))
            ).toEqual({
                categories,
                fetching: [],
                errors: {},
                editingCategory: categories[0]
            });
        });

        it('should handle FINISH_EDIT_TRANSACTION_CATEGORY', () => {
            const editingState = {
                ...state,
                editingCategory: state.categories[0]
            };

            expect(
                reducer(editingState, actions.finishEditCategory())
            ).toEqual({
                categories,
                fetching: [],
                errors: {},
                editingCategory: {}
            });
        });
    });

    describe("DELETE_TRANSACTION_CATEGORY", () => {
        const categories = [
                { id: 1, name: 'Eating out', kind: EXPENSE.id },
                { id: 2, name: 'Rental', kind: INCOME.id }
            ];

        const initialDeleteState = {
            ...initialState,
            categories
        };

        const fetchingDeleteState = {
            ...initialDeleteState,
            fetching: [types.DELETE_TRANSACTION_CATEGORY]
        };

		it('should be handled', () => {
            expect(
                reducer(initialDeleteState, actions.requestDeleteCategory(2))
            ).toEqual({
                fetching: [types.DELETE_TRANSACTION_CATEGORY],
                errors: {},
                categories,
                editingCategory: {}
            });
        });

        it('should be handled when successfull', () => {
            expect(
                reducer(fetchingDeleteState, actions.receiveDeleteCategory(2, 'success'))
            ).toEqual({
                fetching: [],
                errors: {},
                editingCategory: {},
                categories: [ categories[0] ]
            });
        });

        it('should be handled when failed', () => {
            const errors = {'detail' : 'Cant delete this'};

            expect(
                reducer(fetchingDeleteState, actions.receiveDeleteCategory(2, 'fail', errors))
            ).toEqual({
                fetching: [],
                errors,
                editingCategory: {},
                categories                
            });
        });
    });
});