import { EXPENSE, INCOME } from '../../kinds';
import reducer from './reducers';
import actions from './actions';

describe('categories/duck/reducers', () => {

    const initialState = {
        isFetching: false,
        errors: {},
        categories: [],
        editingCategory: {}
    }

    const fetchingState = {
        ...initialState,
        isFetching: true,
        errors: {},
    }

    it('should return the inital state', () => {
        expect(
            reducer(undefined, {})            
        ).to.deep.equal(initialState);
    })

    describe("SAVE_TRANSACTION_CATEGORY", () => {

        it('should be handled', () => {
            expect(
                reducer(undefined, actions.requestSaveCategory())
            ).to.deep.equal({
                categories: [],
                editingCategory: {},
                isFetching: true,
                errors: {}
            })
        })

        it('should be handled when successful', () => {
            const data = { id: 1 };
            expect(
                reducer(fetchingState, actions.receiveSaveCategory('success', data))
            ).to.deep.equal({
                editingCategory: {},
                isFetching: false,
                categories: [ data ],
                errors: {}
            })
        })

        it('should be handled when failed', () => {
            const errors = { name: 'name under use' }
            expect(
                reducer(fetchingState, actions.receiveCategories('fail', errors))
            ).to.deep.equal({
                editingCategory: {},
                categories: [],
                isFetching: false,
                errors
            });
        })

        it('should add category result to categories when id NOT in list', () => {            
            const initialList = [ { id: 1, name: 'Car'}, { id: 2, name: 'Feeding' }]
            const categoryToSave = { id: 3, name: 'House' }
            const expectedList = [ ...initialList, ...categoryToSave ]
            const state = {
                ...initialState,
                categories: initialList
            }

            expect(
                reducer(state, actions.receiveSaveCategory('success', categoryToSave))
            ).to.deep.equal({
                isFetching: false,
                errors: {},
                categories: expectedList,
                editingCategory: {}
            });
        })

        it('should update category result when id in list', () => {
            const initialList = [ { id: 1, name: 'Car'}, { id: 2, name: 'Feeding' }]
            const categoryToSave = { id: 2, name: 'Eating out' }
            const expectedList = [ { id: 1, name: 'Car'}, ...categoryToSave ]
            const state = {
                ...initialState,
                categories: initialList
            }            

            expect(
                reducer(state, actions.receiveSaveCategory('success', categoryToSave))
            ).to.deep.equal({
                isFetching: false,
                errors: {},
                categories: expectedList,
                editingCategory: {}
            });
        })
    })

    describe("FETCH_TRANSACTION_CATEGORIES", () => {
        it('should be handled', () => {
            expect(
                reducer(undefined, actions.requestCategories())
            ).to.deep.equal({
                categories: [],
                errors: {},
                editingCategory: {},
                isFetching: true
            })
        })

        it('should be handled when successful', () => {
            const categories = [ { id: 1 }, { id: 2} ];

            expect(
                reducer(fetchingState, actions.receiveCategories('success', categories))
            ).to.deep.equal({
                editingCategory: {},
                errors: {},
                isFetching: false,
                categories
            })
        })

        it('should be handled when failed', () => {
            const errors = { detail: 'you cant see those categories' }
            expect(
                reducer(fetchingState, actions.receiveCategories('fail', errors))
            ).to.deep.equal({
                editingCategory: {},
                categories: [],
                isFetching: false,
                errors
            });
        })

        it('should replace only categories from requested kind', () => {
            const someCategoriesState = {
                ...initialState,
                categories: [
                    { id: 1, name: 'c1', kind: INCOME.id },
                    { id: 2, name: 'c2', kind: EXPENSE.id },
                ]
            }
            const received = [
                { id: 2, name: 'new c2', kind:EXPENSE.id },
                { id: 3, name: 'c3', kind: EXPENSE.id }
            ]

            expect(
                reducer(someCategoriesState, actions.receiveCategories('success', received, EXPENSE))
            ).to.deep.equal({
                isFetching: false,
                errors: {},
                editingCategory: {},
                categories: [
                    { id: 1, name: 'c1', kind: INCOME.id },
                    { id: 2, name: 'new c2', kind: EXPENSE.id },
                    { id: 3, name: 'c3', kind: EXPENSE.id }
                ]
            })
        })
    })

    describe('EDIT_TRANSACTION_CATEGORY + FINISH_EDIT_TRANSACTION_CATEGORY', () => {

        const categories = [
            { id: 1, name: 'eating out', category: EXPENSE },
            { id: 2, name: 'moneyyyy', category: INCOME }
        ]

        const state = {
            categories,
            errors: {},
            isFetching: false
        }

        it('should handle EDIT_TRANSACTION_CATEGORY', () => {
            expect(
                reducer(state, actions.editCategory(1))
            ).to.deep.equal({
                categories,
                isFetching: false,
                errors: {},
                editingCategory: categories[0]
            })

        })

        it('should handle FINISH_EDIT_TRANSACTION_CATEGORY', () => {
            const editingState = {
                ...state,
                editingCategory: state.categories[0]
            }

            expect(
                reducer(editingState, actions.finishEditCategory())
            ).to.deep.equal({
                categories,
                isFetching: false,
                errors: {},
                editingCategory: {}
            })
        })
    })

    describe("DELETE_TRANSACTION_CATEGORY", () => {
        const categories = [
                { id: 1, name: 'Eating out', kind: EXPENSE.id },
                { id: 2, name: 'Rental', kind: INCOME.id }
            ]

        const initialDeleteState = {
            ...initialState,
            categories
        }

        const fetchingDeleteState = {
            ...initialDeleteState,
            isFetching: true
        }

		it('should be handled', () => {
            expect(
                reducer(initialDeleteState, actions.requestDeleteCategory(2))
            ).to.deep.equal({
                isFetching: true,
                errors: {},
                categories,
                editingCategory: {}
            });
        })

        it('should be handled when successfull', () => {
            expect(
                reducer(fetchingDeleteState, actions.receiveDeleteCategory(2, 'success'))
            ).to.deep.equal({
                isFetching: false,
                errors: {},
                editingCategory: {},
                categories: [ categories[0] ]
            });
        })

        it('should be handled when failed', () => {
            const errors = {'detail' : 'Cant delete this'};

            expect(
                reducer(fetchingDeleteState, actions.receiveDeleteCategory(2, 'fail', errors))
            ).to.deep.equal({
                isFetching: false,
                errors,
                editingCategory: {},
                categories                
            });
        })
    })
})