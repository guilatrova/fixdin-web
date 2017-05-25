import React from 'react';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
import moxios from 'moxios'
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';

//import  from './../../src/'
import * as apiModule from './../../src/services/api';
import TransactionForm from './../../src/transactions/components/TransactionForm';
import { CREATE_TRANSACTION, createTransaction } from './../../src/transactions/actions';

describe('Transaction', () => {

    describe('TransactionForm', () => {

        const defaultProps = { 
            onSubmit: () => {},
            isFetching: false,
            kind: 'income'            
        }

        it('renders ok', () => {
            const wrapper = shallow(<TransactionForm {...defaultProps} />);
            expect(wrapper).to.be.ok;
        })

        const itShouldDisplayErrorForField = (field, controlId, message) => {
            it(`should display error for ${field}`, () => {

                const errors = {
                    [field]: message
                }
                const wrapper = shallow(<TransactionForm errors={errors} onSubmit={() => {}} kind='income' />);
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
        itShouldDisplayErrorForField('deadline_count', 'deadlineGroup', 'deadline invalid state');
        itShouldDisplayErrorForField('priority_level', 'priorityGroup', 'invalid priority');
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
                const wrapper = mount(<TransactionForm onSubmit={() => {}} kind='income' />);            
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

        const fillAllRequiredFields = (inputChangeTrigger) => {
            for (let i = 0; i < requiredFields.length; i++) {
                simulateChange(inputChangeTrigger, requiredFields[i], 'any');
            }
        }

        it('submit button should be enabled when required fields are filled', () => {
            const wrapper = mount(<TransactionForm onSubmit={() => {}} kind='income' />);            
            const input = wrapper.find('#descriptionGroup'); //any input can trigger change
            
            fillAllRequiredFields(input);            

            const submitButton = wrapper.find('button[type="submit"]');
            expect(submitButton.props()['disabled']).to.be.false;
        })

        it('submit button is disabled when isFetching', () => {
            const wrapper = mount(<TransactionForm isFetching={true} onSubmit={() => {}} kind='income' />);            
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

        it('should dispatch action before and after creating transaction', (done) => {            
            debugger;
            const momentStub = { format: () => { return 'a' }}
            const transaction = {
                value: '0',
                due_date: momentStub,
            }

            const expectedResponse = transaction
            const expectedActions = [
                { type: CREATE_TRANSACTION },
                { type: CREATE_TRANSACTION, result: 'success', transaction }
            ]

            store.dispatch(createTransaction(transaction));

            moxios.wait(() => {
                let request = moxios.requests.mostRecent()

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

        xit('should dispatch fail action when something goes wrong');

    })

    describe('Reducers', () => {



    })    

})