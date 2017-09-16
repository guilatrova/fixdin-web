import moxios from 'moxios'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import sinon from 'sinon';
import * as apiModule from './../src/services/api';
import { expect } from 'chai';

class AssertContextHelper {
    constructor(respondWith, store) {
        this.respondWith = respondWith;
        this.store = store;
    }

    expectActionsAsync(done, expectedActions) {
        const { store, respondWith } = this;

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()

            request.respondWith(respondWith)
            .then(() => {
                expect(store.getActions()).to.deep.equal(expectedActions);
                done();
            })
            .catch((error) => done(error.message));
        });
    }

    expectAsync(done, callback) {
        const { store, respondWith } = this;

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()

            request.respondWith(respondWith)
            .then(() => {
                callback();
                done();
            })
            .catch((error) => done(error.message));
        });
    }
    
}

export class ActionsTestHelper {

    mock() {
        this.sandbox = sinon.sandbox.create();
        this.axiosInstance = apiModule.default();
        
        this.sandbox.stub(apiModule, 'default').returns(this.axiosInstance);        
        moxios.install(this.axiosInstance);
    }

    clearMock() {
        this.sandbox.restore();
		moxios.uninstall(this.axiosInstance);
    }

    createStore() {
        const middlewares = [ thunk ];
        const mockStore = configureMockStore(middlewares);

        this.store = mockStore();
        return this.store;
    }

    apiRespondsWith(respondWith) {
        return new AssertContextHelper(respondWith, this.store);
    }

}