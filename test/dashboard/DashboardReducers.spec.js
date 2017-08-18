import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import moment from 'moment';

import reducer, { types } from './../../src/dashboard/ducks';
import actions from './../../src/dashboard/ducks/actions';

describe('Dashboard Reducers', () => {

    const initialState = {
        balance: undefined,
        realBalance: undefined,
        isFetching: false,
        errors: {},
    };

    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).to.deep.equal(initialState);
    });

    describe("FETCH_BALANCE", () => {

        it("should be handled", () => {
            expect(
                reducer(initialState, actions.requestBalance())
            ).to.deep.equal({
                balance: undefined,
                realBalance: undefined,
                isFetching: true,
                errors: {},
            });
        });

        it("should be handled when successful", () => {
            expect(
                reducer(initialState, actions.receiveBalance('success', 50))
            ).to.deep.equal({
                balance: 50,
                realBalance: undefined,
                isFetching: false,
                errors: {},
            });
        });

        it('should be handled when failed', () => {
            const errors = { 'detail':'random error' }
            expect(
                reducer(initialState, actions.receiveBalance('fail', errors))
            ).to.deep.equal({
                balance: undefined,
                realBalance: undefined,
                isFetching: false,
                errors,
            });
        });

    });

});