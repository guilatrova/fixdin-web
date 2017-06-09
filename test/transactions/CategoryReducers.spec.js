import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import categoryReducer from './../../src/transactions/categories/reducers';
import { SAVE_TRANSACTION_CATEGORY, FETCH_TRANSACTION_CATEGORIES } from './../../src/transactions/categories/actions';

describe('Category Reducers', () => {

    const initialState = {
        isFetching: false,
        errors: {},
        categories: []
    }

    const fetchingState = {
        ...initialState,
        isFetching: true,
        errors: {}
    }

    it('should return the inital state', () => {
        expect(
            categoryReducer(undefined, {})            
        ).to.deep.equal(initialState);
    })    

    describe(SAVE_TRANSACTION_CATEGORY, () => {

        it('should be handled', () => {
            expect(
                categoryReducer(undefined, {
                    type: SAVE_TRANSACTION_CATEGORY
                })
            ).to.deep.equal({
                ...initialState,
                isFetching: true,
                errors: {}
            })
        })

        it('should be handled when successful', () => {
            expect(
                categoryReducer(fetchingState, {
                    type: SAVE_TRANSACTION_CATEGORY,
                    result: 'success',
                    category: { id: 1 }
                })
            ).to.deep.equal({
                ...initialState,
                isFetching: false,
                categories: [{ id: 1}],
                errors: {}
            })
        })

        it('should be handled when failed', () => {
            const errors = { name: 'name under use' }
            expect(
                categoryReducer(fetchingState, {
                    type: SAVE_TRANSACTION_CATEGORY,
                    result: 'fail',
                    errors
                })
            ).to.deep.equal({
                ...initialState,
                isFetching: false,
                errors
            });
        })
    })

    describe(FETCH_TRANSACTION_CATEGORIES, () => {
        it('should be handled', () => {
            expect(
                categoryReducer(undefined, {
                    type: FETCH_TRANSACTION_CATEGORIES
                })
            ).to.deep.equal({
                ...initialState,
                isFetching: true
            })
        })

        it('should be handled when successful', () => {
            const categories = [ { id: 1 }, { id: 2} ];

            expect(
                categoryReducer(fetchingState, {
                    type: FETCH_TRANSACTION_CATEGORIES,
                    result: 'success',
                    categories
                })
            ).to.deep.equal({
                ...initialState,
                isFetching: false,
                categories
            })
        })

        it('should be handled when failed', () => {
            const errors = { detail: 'you cant see those categories' }
            expect(
                categoryReducer(fetchingState, {
                    type: FETCH_TRANSACTION_CATEGORIES,
                    result: 'fail',
                    errors
                })
            ).to.deep.equal({
                ...initialState,
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
                categoryReducer(state, {
                    type: SAVE_TRANSACTION_CATEGORY,
                    result: 'success',
                    category: categoryToSave
                })
            ).to.deep.equal({
                isFetching: false,
                errors: {},
                categories: expectedList                
            });
        })

        it('should update category result to categories when id in list', () => {
            const initialList = [ { id: 1, name: 'Car'}, { id: 2, name: 'Feeding' }]
            const categoryToSave = { id: 2, name: 'Eating out' }
            const expectedList = [ { id: 1, name: 'Car'}, ...categoryToSave ]
            const state = {
                ...initialState,
                categories: initialList
            }            

            expect(
                categoryReducer(state, {
                    type: SAVE_TRANSACTION_CATEGORY,
                    result: 'success',
                    category: categoryToSave
                })
            ).to.deep.equal({
                isFetching: false,
                errors: {},
                categories: expectedList
            });
        })
    })
})