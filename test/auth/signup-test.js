import React from 'react';
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';

import SignupForm from './../../src/auth/components/SignupForm';

// describe('SignupForm', () => {
//     sinonStubPromise(sinon);

//     describe('when form submits', () => {
//         it('should call handleSubmit', () => {
//             let signupSubmitStub = sinon.stub().returnsPromise();
//             signupSubmitStub.resolves('ok');

//             const wrapper = mount(<SignupForm sendSignupRequest={signupSubmitStub} />);
//             let compInstance = wrapper.instance();
//             let handleSubmitStub = sinon.stub(compInstance, 'handleSubmit');

//             compInstance.forceUpdate();
//             wrapper.update();

//             wrapper.find('form').simulate('submit');
//             expect(handleSubmitStub.called).to.be.true;
//         });

//         it('should store errors in state', () => {
//             let signupSubmitStub = sinon.stub().returnsPromise();
//             let expectedErrorResponse = { email: 'invalid email address', password: 'invalid password'};
//             signupSubmitStub.rejects(expectedErrorResponse);
            
//             const wrapper = mount(<SignupForm sendSignupRequest={signupSubmitStub} />);
//             const compInstance = wrapper.instance();

//             wrapper.find('form').simulate('submit');

//             expect(signupSubmitStub.called).to.be.true;
//             expect(compInstance.state).to.have.property('errors');
//             expect(compInstance.state.errors).to.equal(expectedErrorResponse);
//         });

//         it('should call promise', () => {
//             let signupSubmitStub = sinon.stub().returnsPromise();
//             signupSubmitStub.resolves('ok');
            
//             const wrapper = mount(<SignupForm sendSignupRequest={signupSubmitStub} />);
//             let compInstance = wrapper.instance();

//             wrapper.find('form').simulate('submit');

//             expect(signupSubmitStub.called).to.be.true;
//         });
//     });
// });
