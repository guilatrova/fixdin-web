import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import moment from 'moment';

import reducer, { types } from './../../src/reports/duck';
import actions from './../../src/reports/duck/actions';

describe('Reports Reducers', () => {

    const initialState = {
        balance: undefined,
        realBalance: undefined,
        isFetching: false,
        errors: {},
    };

    xit('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).to.deep.equal(initialState);
    });

    xdescribe("FETCH_BALANCE", () => {

        xit("should be handled", () => {
            expect(
                reducer(initialState, actions.requestBalance())
            ).to.deep.equal({
                balance: undefined,
                realBalance: undefined,
                isFetching: true,
                errors: {},
            });
        });

        xit("should be handled when successful", () => {
            expect(
                reducer(initialState, actions.receiveBalance('success', 50))
            ).to.deep.equal({
                balance: 50,
                realBalance: undefined,
                isFetching: false,
                errors: {},
            });
        });

        xit('should be handled when failed', () => {
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