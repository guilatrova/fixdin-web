import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import moment from 'moment';

import reducer, { types } from './../../src/reports/duck';
import actions from './../../src/reports/duck/actions';

describe('Reports Reducers', () => {

    const initialState = {
        isFetching: false,
        data: [],
        errors: {},
    };

    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).to.deep.equal(initialState);
    });

    describe("FETCH_LAST_13_MONTHS", () => {

        it("should be handled", () => {
            expect(
                reducer(initialState, actions.requestLast13MonthsReport())
            ).to.deep.equal({
                isFetching: true,
                data: [],
                errors: {},
            });
        });

        it("should be handled when successful", () => {
            const data = [ { id: 1 }, { id: 2 } ];
            expect(
                reducer(initialState, actions.receiveLast13MonthsReport('success', data))
            ).to.deep.equal({
                isFetching: false,
                data,
                errors: {},
            });
        });

        it('should be handled when failed', () => {
            const errors = { 'detail':'random error' }
            expect(
                reducer(initialState, actions.receiveLast13MonthsReport('fail', errors))
            ).to.deep.equal({                
                isFetching: false,
                data: [],
                errors,
            });
        });

    });

});