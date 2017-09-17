import { EXPENSE, INCOME } from '../../kinds';
import operations from './operations';
import types from './types';

describe('categories/duck/actions', () => {
	
	const testHelper = new ActionsTestHelper();
	let store;

	beforeEach(() => {
		testHelper.mock();
		store = testHelper.createStore();
	})

	afterEach(() => {
		testHelper.clearMock();
	})

    describe("SAVE_TRANSACTION_CATEGORY", () => {

        it('should dispatch success action after SAVE_TRANSACTION_CATEGORY', (done) => {
            const category = { id: 1, name: 'Car', kind: EXPENSE.id };
			const expectedActions = [
				{ type: types.SAVE_TRANSACTION_CATEGORY },
				{ type: types.SAVE_TRANSACTION_CATEGORY, result: 'success', category }
			]

			store.dispatch(operations.saveCategory({...category, id: undefined}));

            testHelper.apiRespondsWith({
                status: 201,
                response: category
            })
            .expectActionsAsync(done, expectedActions);
        })

		it('should dispatch fail action after SAVE_TRANSACTION_CATEGORY when something goes wrong', (done) => {
			const expectedResponse = {
				name: 'name already in use',				
			}
			const expectedActions = [
				{ type: types.SAVE_TRANSACTION_CATEGORY },
				{ type: types.SAVE_TRANSACTION_CATEGORY, result: 'fail', errors: expectedResponse }
			]

			store.dispatch(operations.saveCategory({name:'Car', kind:INCOME}));

            testHelper.apiRespondsWith({
                status: 400,
                response: expectedResponse
            })
            .expectActionsAsync(done, expectedActions);
		})

		it('should use PUT when id is supplied', (done) => {
			const editCategory = {id: 2, name: 'eating out', kind: EXPENSE}

			store.dispatch(operations.saveCategory(editCategory));

            testHelper.apiRespondsWith({})
            .expectAsync(done, (request) => {
                expect(request.config.method).to.be.equal('put');
				expect(request.url.indexOf(editCategory.id)).to.be.gt(-1);
            });
		})
    })

	describe("FETCH_TRANSACTION_CATEGORIES", () => {

		it('should dispatch success action after FETCH_TRANSACTION_CATEGORIES', (done) => {
            const categories = [
				{ id: 1, name: 'Car', kind: EXPENSE.id }, 
				{ id: 2, name: 'Feeding', kind: EXPENSE.id }
			];
			const expectedActions = [
				{ type: types.FETCH_TRANSACTION_CATEGORIES },
				{ type: types.FETCH_TRANSACTION_CATEGORIES, kind: EXPENSE, result: 'success', categories }
			]

			store.dispatch(operations.fetchCategories(EXPENSE));

            testHelper.apiRespondsWith({
                status: 201,
                response: categories
            })
            .expectActionsAsync(done, expectedActions);
        })

		it('should dispatch fail action after FETCH_TRANSACTION_CATEGORIES when something goes wrong', (done) => {
			const expectedResponse = {
				detail: 'failed connection'
			}
			const expectedActions = [
				{ type: types.FETCH_TRANSACTION_CATEGORIES },
				{ type: types.FETCH_TRANSACTION_CATEGORIES, result: 'fail', errors: expectedResponse }
			]

			store.dispatch(operations.fetchCategories(INCOME));

            testHelper.apiRespondsWith({
                status: 400,
                response: expectedResponse
            })
            .expectActionsAsync(done, expectedActions);
		});
	})

	describe("DELETE_TRANSACTION_CATEGORY", (done) => {
		it('should dispatch success action after DELETE_TRANSACTION_CATEGORY', (done) => {
			const expectedActions = [
				{ type: types.DELETE_TRANSACTION_CATEGORY, id: 2 },
				{ type: types.DELETE_TRANSACTION_CATEGORY, result: 'success', id: 2 }
			]

			store.dispatch(operations.deleteCategory(2, INCOME));

            testHelper.apiRespondsWith({
                status: 204
            })
            .expectActionsAsync(done, expectedActions);
		})

		it('should dispatch fail action after DELETE_TRANSACTION_CATEGORY', (done) => {
			const errors = { 'detail': 'Already in use' }
			const expectedActions = [
				{ type: types.DELETE_TRANSACTION_CATEGORY, id: 2 },
				{ type: types.DELETE_TRANSACTION_CATEGORY, result: 'fail', errors }
			]

			store.dispatch(operations.deleteCategory(2, INCOME));

            testHelper.apiRespondsWith({
                status: 400,
                response: errors
            })
            .expectActionsAsync(done, expectedActions);
		})
	})
})