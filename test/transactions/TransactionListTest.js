import React from 'react';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
import moxios from 'moxios'
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import moment from 'moment';

//import  from './../../src/'
import * as apiModule from './../../src/services/api';
import TransactionList from './../../src/transactions/components/TransactionList';
import { FETCH_TRANSACTIONS, fetchTransactions } from './../../src/transactions/actions';
import transactionReducer from './../../src/transactions/reducers';

describe('TransactionList', () => {

    describe('Component', () => {

        const defaultProps = {
            onRefresh: () => {},
            isFetching: false,
            kind: 'income',
            transactions: []            
        }

        it('renders ok', () => {
            const wrapper = shallow(<TransactionList {...defaultProps} />);
            expect(wrapper).to.be.ok;
        })

        it('should render transactions in table', () => {
            const transactions = [
                { id: 1, value: '10' },
                { id: 2, value: '11' },
                { id: 3, value: '12' },
            ]

            const wrapper = shallow(<TransactionList {...defaultProps} transactions={transactions} />);
            expect(wrapper.find('tr').length).to.equal(4); //1 TH + 3 TDs
        })
    })

    describe('Actions', () => {
        let sandbox, axiosInstance;
        const middlewares = [ thunk ];
        const mockStore = configureMockStore(middlewares);
        let store;

        beforeEach(() => {
            sandbox = sinon.sandbox.create();
            axiosInstance = apiModule.default();

            sandbox.stub(apiModule, 'default').returns(axiosInstance);
            moxios.install(axiosInstance);
            store =  mockStore();
        })

        afterEach(() => {
            sandbox.restore();
            moxios.uninstall(axiosInstance);
        })

        it('should dispatch success action after FETCH_TRANSACTIONS', (done) => {
            const transactions = [ { id: 1, value: 10 }, { id: 2, value: 11 }, { id: 3, value: 12 }]            
            const expectedActions = [
                { type: FETCH_TRANSACTIONS },
                { type: FETCH_TRANSACTIONS, result: 'success', transactions }
            ]

            store.dispatch(fetchTransactions());

            moxios.wait(() => {
                let request = moxios.requests.mostRecent()

                request.respondWith({
                    status: 201,
                    response: transactions

                }).then(() => {
                    expect(store.getActions()).to.deep.equal(expectedActions);
                    done();
                })
                .catch((error) => done(error.message));
            });
        })

        it('should dispatch fail action after FETCH_TRANSACTION when something goes wrong', (done) => {
            const expectedResponse = {
                detail: 'invalid token',
            }
            const expectedActions = [
                { type: FETCH_TRANSACTIONS },
                { type: FETCH_TRANSACTIONS, result: 'fail', errors: expectedResponse }
            ]

            store.dispatch(fetchTransactions());

            moxios.wait(() => {
                let request = moxios.requests.mostRecent()

                request.respondWith({
                    status: 400,
                    response: expectedResponse

                })
                .then((response) => {                    
                    expect(store.getActions()).to.deep.equal(expectedActions);                    
                    done();
                })
                .catch((error) => {
                    done(`Actions arent equal: ${error}`)
                });
            });
        })
    })

    describe('Reducers', () => {

        it('should handle FETCH_TRANSACTIONS', () => {
            expect(
                transactionReducer(undefined, {
                    type: FETCH_TRANSACTIONS,
                })
            ).to.deep.equal({
                isFetching: true,
                errors: {},
                transactions: []
            });
        })

        it('should handle successful FETCH_TRANSACTIONS', () => {
            const transactions = [ { id: 1 }, { id: 2 } ]

            expect(
                transactionReducer(undefined, {
                    type: FETCH_TRANSACTIONS,
                    result: 'success',
                    transactions
                })
            ).to.deep.equal({
                isFetching: false,
                errors: {},
                transactions
            })
        })

        it('should handle fail FETCH_TRANSACTIONS', () => {
            const errors = { detail: 'unauthorized' };

            expect(
                transactionReducer(undefined, {
                    type: FETCH_TRANSACTIONS,
                    result: 'fail',
                    errors
                })
            ).to.deep.equal({
                isFetching: false,
                errors,
                transactions: []
            })
        })
    })
})