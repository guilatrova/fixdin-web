import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import createAPI from './../../src/services/api';
import * as sessionModule from './../../src/services/session';

const SAVED_TOKEN = 'abc123456';

describe('Session Service', () => {
    beforeEach(() => {
        localStorage.clear();
    })

    it('should save token', () => {
        debugger;
        sessionModule.saveToken(SAVED_TOKEN);
        
        expect(localStorage.getItem(sessionModule.TOKEN_KEY)).to.equal(SAVED_TOKEN);
    })

    it('should retrieve token', () => {
        localStorage.setItem(sessionModule.TOKEN_KEY, SAVED_TOKEN);

        expect(sessionModule.getToken()).to.equal(SAVED_TOKEN);
    })

    it('authentication should return True when has token', () => {
        localStorage.setItem(sessionModule.TOKEN_KEY, SAVED_TOKEN);
        
        expect(sessionModule.isAuthenticated()).to.be.true;
    })
});