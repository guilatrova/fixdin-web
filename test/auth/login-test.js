import React from 'react';
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';

import LoginForm from './../../src/auth/components/LoginForm';

// describe('LoginForm', () => {
//     sinonStubPromise(sinon);

//     describe('when form submits', () => {
//         it('should call handleSubmit', () => {
//             let loginSubmitStub = sinon.stub().returnsPromise();
//             loginSubmitStub.resolves('ok');

//             const wrapper = mount(<LoginForm sendLoginRequest={loginSubmitStub} />);
//             let compInstance = wrapper.instance();
//             let handleSubmitStub = sinon.stub(compInstance, 'handleSubmit');

//             compInstance.forceUpdate();
//             wrapper.update();

//             wrapper.find('form').simulate('submit');        
//             expect(handleSubmitStub.called).to.be.true;
//         });

//         it('should store errors in state', () => {
//             let loginSubmitStub = sinon.stub().returnsPromise();
//             let expectedErrorResponse = { email: 'invalid email address', password: 'invalid password'};
//             loginSubmitStub.rejects(expectedErrorResponse);
            
//             const wrapper = mount(<LoginForm sendLoginRequest={loginSubmitStub} />);
//             const compInstance = wrapper.instance();

//             wrapper.find('form').simulate('submit');

//             expect(loginSubmitStub.called).to.be.true;
//             expect(compInstance.state).to.have.property('errors');
//             expect(compInstance.state.errors).to.equal(expectedErrorResponse);
//         });

//         it('should call promise', () => {
//             let loginSubmitStub = sinon.stub().returnsPromise();
//             loginSubmitStub.resolves('ok');
            
//             const wrapper = mount(<LoginForm sendLoginRequest={loginSubmitStub} />);
//             let compInstance = wrapper.instance();

//             wrapper.find('form').simulate('submit');

//             expect(loginSubmitStub.called).to.be.true;
//         });
//     });
// });

describe('Login', () => {

    describe('LoginForm', () => {

        const assertSubmitDisabled = (wrapper) => {
            const submitButton = wrapper.find('button[type="submit"]');
            expect(submitButton.props()['disabled']).to.be.true;
        };

        const simulateChange = (input, name, value) => {
            input.simulate('change', { target: { name, value }});
        };
    
        it('renders ok', () => {
            const wrapper = shallow(<LoginForm />);
            expect(wrapper).to.be.ok;
        })

        it("submit button should be disabled when isFetching", () => {
            const wrapper = mount(<LoginForm isFetching={true} />);
            assertSubmitDisabled(wrapper);
        })

        it("submit button should be disabled if email is blank", () => {
            const wrapper = mount(<LoginForm />);
            const passwordInput = wrapper.find('#password');
            simulateChange(passwordInput, 'password', '123456');
            //Email still blank

            assertSubmitDisabled(wrapper);
        })

        it("submit button should be disabled if password is blank", () => {
            const wrapper = mount(<LoginForm />);
            const emailInput = wrapper.find('#emailaddress');
            simulateChange(emailInput, 'email', 'guilherme@latrova.com');
            //Password still blank

            assertSubmitDisabled(wrapper);
        })

        it("submit button should be enabled when everything filled", () => {
            const wrapper = mount(<LoginForm />);
            const passwordInput = wrapper.find('#password');
            const emailInput = wrapper.find('#emailaddress');
            simulateChange(emailInput, 'email', 'guilherme@latrova.com');
            simulateChange(passwordInput, 'password', '123456');

            const submitButton = wrapper.find('button[type="submit"]');
            expect(submitButton.props()['disabled']).to.be.false;
        })

        it('should display error when any', () => {
            const error = 'This general error was generated' ;
            const wrapper = shallow(<LoginForm error={error} />);            
            expect(wrapper.find('Alert')).to.have.length(1);
            expect(wrapper.contains(
                error
            )).to.be.true;
        })
    });

    describe('Actions', () => {

    });

    
});