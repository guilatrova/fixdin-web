import React from 'react';
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';

import LoginForm from './../../src/auth/components/LoginForm';

describe('LoginForm', () => {
    sinonStubPromise(sinon);

    describe('when form submits', () => {
        it('should call handleSubmit', () => {
            let loginSubmitStub = sinon.stub().returnsPromise();
            loginSubmitStub.resolves('ok');

            const wrapper = mount(<LoginForm sendLoginRequest={loginSubmitStub} />);
            let compInstance = wrapper.instance();
            let handleSubmitStub = sinon.stub(compInstance, 'handleSubmit');

            compInstance.forceUpdate();
            wrapper.update();

            wrapper.find('form').simulate('submit');        
            expect(handleSubmitStub.called).to.be.true;
        });

        it('should store errors in state', () => {
            let loginSubmitStub = sinon.stub().returnsPromise();
            let expectedErrorResponse = { email: 'invalid email address', password: 'invalid password'};
            loginSubmitStub.rejects(expectedErrorResponse);
            
            const wrapper = mount(<LoginForm sendLoginRequest={loginSubmitStub} />);
            const compInstance = wrapper.instance();

            wrapper.find('form').simulate('submit');

            expect(loginSubmitStub.called).to.be.true;
            expect(compInstance.state).to.have.property('errors');
            expect(compInstance.state.errors).to.equal(expectedErrorResponse);
        });

        it('should call promise', () => {
            let loginSubmitStub = sinon.stub().returnsPromise();
            loginSubmitStub.resolves('ok');
            
            const wrapper = mount(<LoginForm sendLoginRequest={loginSubmitStub} />);
            let compInstance = wrapper.instance();

            wrapper.find('form').simulate('submit');

            expect(loginSubmitStub.called).to.be.true;
        });
    });
});
