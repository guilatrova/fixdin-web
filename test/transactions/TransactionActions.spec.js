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

import * as apiModule from './../../src/services/api';
import { FETCH_TRANSACTIONS, EDIT_TRANSACTION, SAVE_TRANSACTION, fetchTransactions, saveTransaction } from './../../src/transactions/actions';
import transactionReducer from './../../src/transactions/reducers';

describe('Transaction Actions', () => {

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

        describe('FETCH_TRANSACTIONS', () => {

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

        describe('SAVE_TRANSACTION', () => {
            const momentStub = { format: () => { return 'a' }}
            const transaction = { //only necessary fields...
                value: '0',
                due_date: momentStub,
            }

            it('should dispatch success action after SAVE_TRANSACTION', (done) => {
                const expectedResponse = transaction
                const expectedActions = [
                    { type: SAVE_TRANSACTION },
                    { type: SAVE_TRANSACTION, result: 'success', transaction }
                ]

                store.dispatch(saveTransaction(transaction));

                moxios.wait(() => {
                    let request = moxios.requests.mostRecent();

                    request.respondWith({
                        status: 201,
                        response: expectedResponse

                    }).then(() => {
                        expect(store.getActions()).to.deep.equal(expectedActions);
                        done();
                    })
                    .catch((error) => done(error.message));
                });
            })

            it('should dispatch fail action after SAVE_TRANSACTION when something goes wrong', (done) => {
                const expectedResponse = {
                    value: 'invalid value supplied',
                    category: 'mandatory field'
                }
                const expectedActions = [
                    { type: SAVE_TRANSACTION },
                    { type: SAVE_TRANSACTION, result: 'fail', errors: expectedResponse }
                ]

                store.dispatch(saveTransaction(transaction));

                moxios.wait(() => {
                    let request = moxios.requests.mostRecent();
                    
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
            });

            it('SAVE_TRANSACTION should use PUT when id is supplied', (done) => {
                const editTransaction = {...transaction, id: 1}

                store.dispatch(saveTransaction(editTransaction));

                moxios.wait(() => {                
                    let request = moxios.requests.mostRecent();
                    expect(request.config.method).to.be.equal('put');
                    expect(request.url.indexOf(editTransaction.id)).to.be.gt(-1);
                    done();
                });
            })
        })        
    })
})