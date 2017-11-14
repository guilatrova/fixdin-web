import chai from 'chai';
import { mockAxios } from './reduxHelpers';

class LocalStorageMock {
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key) {
      return this.store[key] || null;
    }
  
    setItem(key, value) {
      this.store[key] = value.toString();
    }
  
    removeItem(key) {
      delete this.store[key];
    }
}
  
global.localStorage = new LocalStorageMock;

const originalNot = Object.getOwnPropertyDescriptor(chai.Assertion.prototype, 'not').get;
Object.defineProperty(chai.Assertion.prototype, 'not', {
    get() {
        Object.assign(this, this.assignedNot);
        return originalNot.apply(this);
    },
    set(newNot) {
        this.assignedNot = newNot;
        return newNot;
    }
});

// Combine both jest and chai matchers on expect
const jestExpect = global.expect;

global.jestExpect = jestExpect;
global.mockAxios = mockAxios;
global.expect = actual => {
    const originalMatchers = jestExpect(actual);
    const chaiMatchers = chai.expect(actual);
    const combinedMatchers = Object.assign(chaiMatchers, originalMatchers);
    return combinedMatchers;
};