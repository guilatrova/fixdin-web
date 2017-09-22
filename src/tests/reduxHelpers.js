import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

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
            .catch((error) => { var acts = store.getActions(); debugger; done(error.message); });
        });
    }

    expectAsync(done, callback) {
        const { store, respondWith } = this;

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()

            request.respondWith(respondWith)
            .then(() => {
                callback(request);
                done();
            })
            .catch((error) => done(error.message));
        });
    }
    
}

export class ActionsTestHelper {

    mock(apiModule) {        
        this.sandbox = sinon.sandbox.create();
        this.axiosInstance = apiModule.default();
        moxios.install(this.axiosInstance);
        
        this.sandbox.stub(apiModule, 'default').returns(this.axiosInstance);        
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