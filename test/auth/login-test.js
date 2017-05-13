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
            let loginStub = sinon.stub().returnsPromise();
            loginStub.resolves('ok');

            const wrapper = mount(<LoginForm sendLoginRequest={loginStub} />);
            let compInstance = wrapper.instance();
            let handleSubmitStub = sinon.stub(compInstance, 'handleSubmit');

            compInstance.forceUpdate();
            wrapper.update();

            wrapper.find('form').simulate('submit');        
            expect(handleSubmitStub.called).to.be.true;
        });

        it('should store errors in state', (done) => {
            done('not finished yet');
        });

        it('should call promise', () => {
            let loginStub = sinon.stub().returnsPromise();
            loginStub.resolves('ok');
            
            const wrapper = mount(<LoginForm sendLoginRequest={loginStub} />);
            let compInstance = wrapper.instance();

            wrapper.find('form').simulate('submit');

            expect(loginStub.called).to.be.true;
        });
    });
});
