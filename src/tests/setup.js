import jsdom from 'jsdom';
import React from 'react';
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';

import { LocalStorageMock } from './LocalStorageMock';
import { ActionsTestHelper } from './reduxHelpers';
import { 
    itShouldDisplayErrorForField, 
    itSubmitButtonShouldBeDisabledWhenFieldIsBlank,
    fillAllRequiredFields 
} from './componentHelpers';

sinonStubPromise(sinon);

global.React = React;
global.expect = expect;
global.sinon = sinon;
global.shallow = shallow;
global.mount = mount;
global.ActionsTestHelper = ActionsTestHelper;
global.itShouldDisplayErrorForField = itShouldDisplayErrorForField;
global.itSubmitButtonShouldBeDisabledWhenFieldIsBlank = itSubmitButtonShouldBeDisabledWhenFieldIsBlank;
global.fillAllRequiredFields = fillAllRequiredFields;

if(!global.document) {
	global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
	global.window = document.defaultView;
	global.navigator = {userAgent: 'node.js'};
	global.localStorage = new LocalStorageMock; 
}

global.screen = {
	width: 1024,
	height: 768
}