var jsdom = require('jsdom');

class LocalStorageMock { 
  constructor() { 
    this.store = {}; 
  } 
 
  clear() { 
    this.store = {}; 
  } 
 
  getItem(key) { 
    return this.store[key]; 
  } 
 
  setItem(key, value) { 
    this.store[key] = value;
  } 
}; 

if(!global.document) {
  global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
  global.window = document.defaultView;
  global.navigator = {userAgent: 'node.js'};
  global.localStorage = new LocalStorageMock; 
}
