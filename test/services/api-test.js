import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import axios from 'axios'
import moxios from 'moxios'

import createAPI from './../../src/services/api';
import * as sessionModule from './../../src/services/session';

const SAVED_TOKEN = 'abc123456';

describe('API Service', () => {

    describe('when session has token', () => {    

        beforeEach(() => {
            sessionModule.saveToken(SAVED_TOKEN);
        })

        it('should create AXIOS with correctly authorization header', () => {
            const axiosInstance = createAPI();

            expect(axiosInstance.defaults.headers).to.have.property('Authorization');
            expect(axiosInstance.defaults.headers.Authorization).to.equal(`Token ${SAVED_TOKEN}`);
        })

    });

    describe('when session is empty', () => {

        beforeEach(() => {
            localStorage.clear();
        })

        it('should create AXIOS without authorization header', () => {
            debugger;
            const axiosInstance = createAPI();
            
            expect(axiosInstance.defaults.headers).to.not.have.property('Authorization');
        })
    });

});