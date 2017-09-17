import jsdom from 'jsdom';
import sinon from 'sinon';
import { expect } from 'chai';

import { LocalStorageMock } from './LocalStorageMock';
import { ActionsTestHelper } from './reduxTestHelpers';

global.expect = expect;
global.sinon = sinon;
global.ActionsTestHelper = ActionsTestHelper;

if(!global.document) {
	global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
	global.window = document.defaultView;
	global.navigator = {userAgent: 'node.js'};
	global.localStorage = new LocalStorageMock; 
}
