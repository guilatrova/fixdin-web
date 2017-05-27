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
import TransactionForm from './../../src/transactions/components/TransactionForm';
import { SAVE_TRANSACTION, saveTransaction } from './../../src/transactions/actions';
import * as actionModule from './../../src/transactions/actions';
import transactionReducer from './../../src/transactions/reducers';

describe('TransactionForm', () => {

    describe('Component', () => {

        const defaultProps = { 
            onSubmit: () => {},
            isFetching: false,
            kind: 'income'
        }

        describe('in any mode', () => {
            it('renders ok', () => {
                const wrapper = shallow(<TransactionForm {...defaultProps} />);
                expect(wrapper).to.be.ok;
            })

            const itShouldDisplayErrorForField = (field, controlId, message) => {
                it(`should display error for ${field}`, () => {

                    const errors = {
                        [field]: message
                    }
                    const wrapper = shallow(<TransactionForm {...defaultProps} errors={errors} />);
                    const formGroup = wrapper.find(`FormGroup[controlId="${controlId}"]`);

                    expect(formGroup.props().validationState).to.be.equal('error');
                    expect(wrapper.contains(
                        message
                    )).to.be.true;
                })
            }

            itShouldDisplayErrorForField('due_date', 'dueDateGroup', 'invalid date');
            itShouldDisplayErrorForField('value', 'valueGroup', 'invalid value');
            itShouldDisplayErrorForField('description', 'descriptionGroup', 'invalid description');
            itShouldDisplayErrorForField('category', 'categoryGroup', 'wrong category');
            itShouldDisplayErrorForField('deadline', 'deadlineGroup', 'deadline invalid state');
            itShouldDisplayErrorForField('importance', 'priorityGroup', 'invalid priority');
            itShouldDisplayErrorForField('details', 'detailsGroup', 'wrong details supplied');

            const simulateChange = (input, name, value) => {
                input.simulate('change', { target: { name, value }});
            };

            const assertSubmitDisabled = (wrapper) => {
                const submitButton = wrapper.find('button[type="submit"]');
                expect(submitButton.props()['disabled']).to.be.true;
            };

            const requiredFields = ["due_date", "value", "description", "category"];

            const itSubmitButtonShouldBeDisabledWhenFieldIsBlank = (field) => {
                it (`submit button should be disabled when ${field} is blank `, () => {
                    const wrapper = mount(<TransactionForm {...defaultProps} />);            
                    const input = wrapper.find('#descriptionGroup'); //any input can trigger change

                    for (let i = 0; i < requiredFields.length; i++) {
                        if (requiredFields[i] != field) {
                            simulateChange(input, requiredFields[i], 'any');
                        }
                        else {
                            simulateChange(input, requiredFields[i], '');
                        }
                    }

                    assertSubmitDisabled(wrapper);
                });
            }

            itSubmitButtonShouldBeDisabledWhenFieldIsBlank('due_date');
            itSubmitButtonShouldBeDisabledWhenFieldIsBlank('value');
            itSubmitButtonShouldBeDisabledWhenFieldIsBlank('description');
            itSubmitButtonShouldBeDisabledWhenFieldIsBlank('category');        

            const fillAllRequiredFields = (inputChangeTrigger, fieldsValue = {}) => {
                for (let i = 0; i < requiredFields.length; i++) {
                    const field = requiredFields[i]; 
                    const value = fieldsValue[field] || 'any';                
                    simulateChange(inputChangeTrigger, field, value);
                }
            }

            it('submit button should be disabled when due_date is invalid', () => {
                const wrapper = mount(<TransactionForm {...defaultProps} />);            
                const input = wrapper.find('#descriptionGroup'); //any input can trigger change
                
                fillAllRequiredFields(input);

                assertSubmitDisabled(wrapper);
            })

            it('submit button should be enabled when required fields are correctly filled', () => {
                const wrapper = mount(<TransactionForm {...defaultProps} />);            
                const input = wrapper.find('#descriptionGroup'); //any input can trigger change
                
                fillAllRequiredFields(input, { due_date: moment(new Date())});

                const submitButton = wrapper.find('button[type="submit"]');
                expect(submitButton.props()['disabled']).to.be.false;
            })

            it('submit button is disabled when isFetching', () => {
                const wrapper = mount(<TransactionForm {...defaultProps} isFetching={true} />);            
                const input = wrapper.find('#descriptionGroup'); //any input can trigger change

                fillAllRequiredFields(input);

                assertSubmitDisabled(wrapper);
            })

            it('should calls OnSubmit', () => {
                let submitSpy = sinon.spy();

                const wrapper = mount(<TransactionForm {...defaultProps} onSubmit={submitSpy} />);
                wrapper.find('form').simulate('submit');

                expect(submitSpy.called).to.be.true;
            })
        })

        describe('in Edit mode', () => {
            const editingTransaction = {
                id: 1,
                account: 2,
                due_date: moment(new Date(2017, 3, 3)),
                description: 'editing this',
                category: '1',
                value: '15,00',
                details: 'more details'
            }

            it('starts with transaction data filled in', () => {
                const wrapper = shallow(<TransactionForm {...defaultProps} transaction={editingTransaction} />);

                const state = wrapper.state();

                for (let prop in editingTransaction) {
                    if (editingTransaction.hasOwnProperty(prop)) {
                        expect(state[prop]).to.equal(editingTransaction[prop]);
                    }
                }

            })
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

    describe('Reducers', () => {

        const initialState = {
            transactions: [],
            isFetching: false,
            errors: {}
        }

        it('should return the initial state', () => {
            expect(
                transactionReducer(undefined, {})
            ).to.deep.equal(initialState);
        })

        it('should handle SAVE_TRANSACTION', () => {
            expect(
                transactionReducer(undefined, {
                    type: SAVE_TRANSACTION,                    
                })
            ).to.deep.equal({
                isFetching: true,
                errors: {},
                transactions: []
            });
        })

        it('should handle successful SAVE_TRANSACTION', () => {
            expect(
                transactionReducer(undefined, {
                    type: SAVE_TRANSACTION,
                    result: 'success',
                    transaction: { id: 1 }
                })
            ).to.deep.equal({
                isFetching: false,
                errors: {},
                transactions: [{ id: 1 }]
            });
        })

        it('should handle fail SAVE_TRANSACTION', () => {
            const errors = {
                value: 'invalid value',
                category: 'field is mandatory'
            }

            expect(
                transactionReducer(undefined, {
                    type: SAVE_TRANSACTION,
                    result: 'fail',
                    errors
                })
            ).to.deep.equal({
                isFetching: false,
                errors,
                transactions: []
            });
        })

    })    

})