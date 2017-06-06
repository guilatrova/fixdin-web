import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import categoryReducer from './../../src/categories/reducers';
import { SAVE_TRANSACTION_CATEGORY } from './../../src/categories/actions';

describe('Category Reducers', () => {

    const initialState = {
        isFetching: false,
        errors: {}
    }

    it('should return the inital state', () => {
        expect(
            categoryReducer(undefined, {})            
        ).to.deep.equal(initialState);
    })

    describe(SAVE_TRANSACTION_CATEGORY, () => {

        const fetchingState = {
            ...initialState,
            isFetching: true,
            errors: {}
        }

        it('should be handled', () => {
            expect(
                categoryReducer(undefined, {
                    type: SAVE_TRANSACTION_CATEGORY
                })
            ).to.deep.equal({
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
                isFetching: false,
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
                isFetching: false,
                errors
            });
        })
    })
})