import axios from 'axios'
import createAPI from './api';
import * as sessionModule from './session';

describe('services/API', () => {
    const SAVED_TOKEN = 'abc123456';

    describe('when session has token', () => {    

        beforeEach(() => {
            sessionModule.saveToken(SAVED_TOKEN);
        })

        it('should create AXIOS with correctly authorization header', () => {
            const axiosInstance = createAPI();

            expect(axiosInstance.defaults.headers).to.have.property('Authorization');
            expect(axiosInstance.defaults.headers.Authorization).to.equal(`Token ${SAVED_TOKEN}`);
        })

        it('should create AXIOS without header if false is passed', () => {
            const axiosInstance = createAPI(false);

            expect(axiosInstance.defaults.headers).to.not.have.property('Authorization');
        })

    });

    describe('when session is empty', () => {

        beforeEach(() => {
            localStorage.clear();
        })

        it('should create AXIOS without authorization header', () => {
            const axiosInstance = createAPI();
            
            expect(axiosInstance.defaults.headers).to.not.have.property('Authorization');
        })
    });

});