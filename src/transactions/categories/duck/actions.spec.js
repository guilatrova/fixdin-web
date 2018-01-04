import { EXPENSE, INCOME } from '../../kinds';
import operations from './operations';
import types from './types';

describe('categories/duck/actions', () => {
	let store, mock, restoreMock;
	
	beforeEach(() => {
		const mockHelper = mockAxios();
		mock = mockHelper.mock;
		store = mockHelper.store;
		restoreMock = mockHelper.restoreMock;
	});
	
	afterEach(() => {
		restoreMock();
	});

    describe("SAVE_TRANSACTION_CATEGORY", () => {

        it('should dispatch success action after SAVE_TRANSACTION_CATEGORY', () => {
            const category = { id: 1, name: 'Car', kind: EXPENSE.id };
			const expectedActions = [
				{ type: types.SAVE_TRANSACTION_CATEGORY },
				{ type: types.SAVE_TRANSACTION_CATEGORY, result: 'success', category }
			];

			mock.onPost().reply(200, category);

			return store.dispatch(operations.saveCategory({...category, id: undefined})).then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
        });

		it('should dispatch fail action after SAVE_TRANSACTION_CATEGORY when something goes wrong', () => {
			const expectedResponse = {
				name: 'name already in use',				
			};
			const expectedActions = [
				{ type: types.SAVE_TRANSACTION_CATEGORY },
				{ type: types.SAVE_TRANSACTION_CATEGORY, result: 'fail', errors: expectedResponse }
			];

			mock.onPost().reply(400, expectedResponse);

			return store.dispatch(operations.saveCategory({name:'Car', kind:INCOME})).then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		});
    });

	describe("FETCH_TRANSACTION_CATEGORIES", () => {

		xit('should dispatch success action after FETCH_TRANSACTION_CATEGORIES', () => {
            const categories = [
				{ id: 1, name: 'Car', kind: EXPENSE.id }, 
				{ id: 2, name: 'Feeding', kind: EXPENSE.id }
			];
			const expectedActions = [
				{ type: types.FETCH_TRANSACTION_CATEGORIES },
				{ type: types.FETCH_TRANSACTION_CATEGORIES, kind: EXPENSE, result: 'success', categories }
			];

			mock.onGet().reply(201, categories);

			return store.dispatch(operations.fetchCategories(EXPENSE)).then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
        });

		xit('should dispatch fail action after FETCH_TRANSACTION_CATEGORIES when something goes wrong', () => {
			const expectedResponse = {
				detail: 'failed connection'
			};
			const expectedActions = [
				{ type: types.FETCH_TRANSACTION_CATEGORIES },
				{ type: types.FETCH_TRANSACTION_CATEGORIES, result: 'fail', errors: expectedResponse }
			];

			mock.onGet().reply(401, expectedResponse);

			return store.dispatch(operations.fetchCategories(INCOME)).then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		});
	});

	describe("DELETE_TRANSACTION_CATEGORY", () => {
		it('should dispatch success action after DELETE_TRANSACTION_CATEGORY', () => {
			const expectedActions = [
				{ type: types.DELETE_TRANSACTION_CATEGORY, id: 2 },
				{ type: types.DELETE_TRANSACTION_CATEGORY, result: 'success', id: 2 }
			];

			mock.onDelete().reply(204);

			return store.dispatch(operations.deleteCategory(2, INCOME)).then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});            
		});

		it('should dispatch fail action after DELETE_TRANSACTION_CATEGORY', () => {
			const errors = { 'detail': 'Already in use' };
			const expectedActions = [
				{ type: types.DELETE_TRANSACTION_CATEGORY, id: 2 },
				{ type: types.DELETE_TRANSACTION_CATEGORY, result: 'fail', errors }
			];

			mock.onDelete().reply(401, errors);

			return store.dispatch(operations.deleteCategory(2, INCOME)).then(() => {
				expect(store.getActions()).toEqual(expectedActions);
			});
		});
	});
});