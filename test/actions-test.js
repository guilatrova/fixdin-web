import React from 'react';
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import axios from 'axios'
import moxios from 'moxios'

import * as apiModule from '../src/services/api';
import * as sessionModule from '../src/services/session';
import * as authActionsModule from '../src/auth/authActions';

describe('Auth Actions', () => {
    beforeEach(function () {
      sinonStubPromise(sinon);
      this.axiosInstance = apiModule.default();
      this.axiosInstance.baseURL = 'http://mocked/api';

      sinon.stub(apiModule, 'default').returns(this.axiosInstance);
      moxios.install(this.axiosInstance);
    })

    it('should call save token when login request is succeed', (done) => {
        let expectedResponse = { token: 'abc123456' };
        let sessionSpy = sinon.spy(sessionModule, 'saveToken');

        authActionsModule.sendLoginRequest({ email:'any', password:'any' })();

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()

            request.respondWith({
                status: 200,
                response: expectedResponse

            }).then(() => {                
                expect(sessionSpy.calledWith(expectedResponse.token)).to.be.true;
                done();
            })
            .catch((error) => done(error.message));
        });
    });

});