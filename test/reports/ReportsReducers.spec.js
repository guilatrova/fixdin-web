import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import moment from 'moment';

import reducer, { types } from './../../src/reports/duck';
import actions from './../../src/reports/duck/actions';

xdescribe('Reports Reducers', () => {

    const initialState = {
        isFetching: false,
        data: { 
            expected: [],
            real: []
        },
        errors: {},
    };

    it('should return the initial state', () => {
        expect(
            reducer(undefined, {}).last13Months
        ).to.deep.equal(initialState);
    });

    describe("FETCH_LAST_13_MONTHS", () => {

        it("should be handled", () => {
            expect(
                reducer(initialState, actions.requestLast13MonthsReport()).last13Months
            ).to.deep.equal({
                isFetching: true,
                data: { 
                    expected: [],
                    real: []
                },
                errors: {},
            });
        });

        xdescribe("should be handled when successful", () => {

            it('with "REAL" data', () => {
                const data = [ { id: 1 }, { id: 2 } ];
                expect(
                    reducer(initialState, actions.receiveLast13MonthsReport('success', data, true)).last13Months
                ).to.deep.equal({
                    isFetching: false,
                    data: { 
                        expected: [],
                        real: data
                    },
                    errors: {},
                });
            });

            it('with "EXPECTED" data', () => {
                const data = [ { id: 1 }, { id: 2 } ];
                expect(
                    reducer(initialState, actions.receiveLast13MonthsReport('success', data, false)).last13Months
                ).to.deep.equal({
                    isFetching: false,
                    data: { 
                        expected: data,
                        real: []
                    },
                    errors: {},
                });
            });

        });


        it('should be handled when failed', () => {
            const errors = { 'detail':'random error' }
            expect(
                reducer(initialState, actions.receiveLast13MonthsReport('fail', errors)).last13Months
            ).to.deep.equal({                
                isFetching: false,
                data: { 
                    expected: [],
                    real: []
                },
                errors,
            });
        });

    });

    xdescribe('FETCH_PENDING_TRANSACTIONS', () => {

        it("should be handled", () => {
            expect(
                
            ).to.deep.equal({

            });
        });

        describe("should be handled when successful", () => {

            it('with "expenses" data', () => {
                const data = [ { id: 1 }, { id: 2 } ];
                expect(
                ).to.deep.equal({
                    isFetching: false,
                    data: { 
                        expected: [],
                        real: data
                    },
                    errors: {},
                });
            });

            it('with "incomes" data', () => {
                const data = [ { id: 1 }, { id: 2 } ];
                expect(

                ).to.deep.equal({

                });
            });

        });


        it('should be handled when failed', () => {
            const errors = { 'detail':'random error' }
            expect(
                
            ).to.deep.equal({                
                
            });
        });
    });

    xdescribe('FETCH_VALUES_BY_CATEGORY', () => {
        
        it("should be handled", () => {
            expect(
                
            ).to.deep.equal({

            });
        });

        describe("should be handled when successful", () => {

            it('with "expenses" data', () => {
                const data = [ { id: 1 }, { id: 2 } ];
                expect(
                ).to.deep.equal({
                    isFetching: false,
                    data: { 
                        expected: [],
                        real: data
                    },
                    errors: {},
                });
            });

            it('with "incomes" data', () => {
                const data = [ { id: 1 }, { id: 2 } ];
                expect(

                ).to.deep.equal({

                });
            });

        });


        it('should be handled when failed', () => {
            const errors = { 'detail':'random error' }
            expect(
                
            ).to.deep.equal({                
                
            });
        });
    });

});