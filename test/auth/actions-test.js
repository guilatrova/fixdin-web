import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import axios from 'axios'
import moxios from 'moxios'

import * as apiModule from './../../src/services/api';
import * as sessionModule from './../../src/services/session';
import * as authActionsModule from './../../src/auth/authActions';

let sandbox, axiosInstance;

describe('Auth Actions', () => {
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        axiosInstance = apiModule.default();

        sandbox.stub(apiModule, 'default').returns(axiosInstance);
        moxios.install(axiosInstance);
    })

    afterEach(() => {
        sandbox.restore();
        moxios.uninstall(axiosInstance);
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