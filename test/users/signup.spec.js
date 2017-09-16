import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import moxios from 'moxios';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { ActionsTestHelper } from './../reduxTestHelpers';

import * as apiModule from './../../src/services/api';
import SignupForm from './../../src/users/components/SignupForm';
import reducer, { operations, types } from './../../src/users/duck';
import actions from './../../src/users/duck/actions';
import { 
    itShouldDisplayErrorForField, 
    itSubmitButtonShouldBeDisabledWhenFieldIsBlank,
    fillAllRequiredFields 
} from './../testHelpers';

describe('Signup', () => {

    describe('SignupForm', () => {

        const requiredFields = ["username", "first_name", "last_name", "email", "password"];
        const triggerReference = 'FormControl[name="username"]';
        const defaultProps = {
            onSubmit: () => {},
            isFetching: false,
            errors: {}
        }

        describe('renders ok', () => {
            const wrapper = shallow(<SignupForm {...defaultProps} />);
            expect(wrapper).to.be.ok;
        })
        
        itShouldDisplayErrorForField(shallow(<SignupForm {...defaultProps} />), 'username', 'usernameGroup', 'username already in use');
        itShouldDisplayErrorForField(shallow(<SignupForm {...defaultProps} />), 'first_name', 'firstNameGroup', 'first name is required');
        itShouldDisplayErrorForField(shallow(<SignupForm {...defaultProps} />), 'last_name', 'lastNameGroup', 'last name is required');
        itShouldDisplayErrorForField(shallow(<SignupForm {...defaultProps} />), 'email', 'emailAddressGroup', 'Email invalid. How we would send you spam?');
        itShouldDisplayErrorForField(shallow(<SignupForm {...defaultProps} />), 'password', 'passwordGroup', 'password is too short');          

        itSubmitButtonShouldBeDisabledWhenFieldIsBlank(shallow(<SignupForm {...defaultProps} />), triggerReference, requiredFields, 'username');
        itSubmitButtonShouldBeDisabledWhenFieldIsBlank(shallow(<SignupForm {...defaultProps} />), triggerReference, requiredFields, 'email');
        itSubmitButtonShouldBeDisabledWhenFieldIsBlank(shallow(<SignupForm {...defaultProps} />), triggerReference, requiredFields, 'password');
        itSubmitButtonShouldBeDisabledWhenFieldIsBlank(shallow(<SignupForm {...defaultProps} />), triggerReference, requiredFields, 'first_name');
        itSubmitButtonShouldBeDisabledWhenFieldIsBlank(shallow(<SignupForm {...defaultProps} />), triggerReference, requiredFields, 'last_name');

        it('submit button should be disabled when isFetching', () => {
            const wrapper = shallow(<SignupForm {...defaultProps} isFetching={true} />);
            const input = wrapper.find(triggerReference);
            
            fillAllRequiredFields(input, requiredFields);

            expect(wrapper.find('Button').prop('disabled')).to.be.true;
        })

        it('submit button should be enabled when required fields are correctly filled', () => {
            const wrapper = shallow(<SignupForm {...defaultProps} />);            
            const input = wrapper.find(triggerReference);
            
            fillAllRequiredFields(input, requiredFields);

            const submitButton = wrapper.find('Button[type="submit"]');
            expect(submitButton.prop('disabled')).to.be.false;
        })

        it('should calls OnSubmit', () => {
            let submitPromise = sinon.stub().returnsPromise();
            submitPromise.resolves({ result: 'success '});

            const wrapper = mount(<SignupForm {...defaultProps} onSubmit={submitPromise} />);
            wrapper.find('form').simulate('submit');

            expect(submitPromise.called).to.be.true;
        })
    })

    describe('Actions', () => {
        const testHelper = new ActionsTestHelper();
        let store;

        beforeEach(() => {
            testHelper.mock();
            store = testHelper.createStore();
        })

        afterEach(() => {
            testHelper.clearMock();
        })

        it('should dispatch actions before and after signup when successful', (done) => {
            const user = { id: 2 };
            const expectedActions = [
                { type: types.SIGNUP },
                { type: types.SIGNUP, result: 'success', user }
            ]

            store.dispatch(operations.requestSignup({}));

            testHelper.apiRespondsWith({
                status: 200,
                response: user
            })
            .expectActionsAsync(done, expectedActions);
        })

        it('should dispatch finished with error when signup fails', (done) => {
            const errors = { email: 'You shall not pass'}
            const expectedActions = [
                { type: types.SIGNUP },
                { type: types.SIGNUP, result: 'fail', errors }
            ]

            store.dispatch(operations.requestSignup({}));

            testHelper.apiRespondsWith({
                status: 400,
                response: errors
            })
            .expectActionsAsync(done, expectedActions);
        })

    })

    describe('Reducers', () => {
        const initialState = {
            isFetching: false,
            errors: {}
        }

        it('should return the initial state', () => {
            expect(
                reducer(undefined, {}).signup
            ).to.deep.equal(initialState);
        })

        it('should handle SIGNUP', () => {
            expect(
                reducer(undefined, actions.requestSignup()).signup
            ).to.deep.equal({
                isFetching: true,
                errors: {}
            });
        })

        it('should handle successful SIGNUP', () => {
            expect(
                reducer(undefined, actions.receiveSignup('success', {})).signup
            ).to.deep.equal({
                isFetching: false,
                errors: {}
            });
        })

        it('should handle failed SIGNUP', () => {
            const errors = {
                email: 'invalid address',
                password: 'too short'
            }

            expect(
                reducer(undefined, actions.receiveSignup('fail', errors)).signup
            ).to.deep.equal({
                isFetching: false,                
                errors
            });
        })
    })

})