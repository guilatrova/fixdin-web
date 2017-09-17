import createAPI from './api';
import * as sessionModule from './session';

describe('services/session', () => {

    const SAVED_TOKEN = 'abc123456';

    beforeEach(() => {
        localStorage.clear();
    })

    it('should save token', () => {
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